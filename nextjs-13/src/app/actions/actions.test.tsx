/**
 * @jest-environment node
 */
import { Prisma } from '@prisma/client';

import { newsletterFactory } from '@test/factories/newsletter.factory';
import { userFactory } from '@test/factories/user.factory';
import { invalidParamsMessage } from 'lib/request/getInvalidParamsError';
import withAuth from 'lib/withAuth/withAuth';
import {
  createNewsletter as createRecord,
  updateNewsletter as updateRecord,
  deleteNewsletter as deleteRecord,
  countNewsletters,
} from 'repositories/newsletter.repository';
import { sendMailQueue } from 'workers/email.worker';

import {
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  sendNewsletter,
} from './actions';

jest.mock('lib/request/getServerSession', () => ({
  getServerSession: jest.fn(),
}));
jest.mock('lib/withAuth/withAuth');
jest.mock('repositories/newsletter.repository');
jest.mock('workers/email.worker', () => ({
  sendMailQueue: {
    add: jest.fn(),
  },
}));

describe('createNewsletter', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('given valid params', () => {
    it('creates a newsletter', async () => {
      const user = { id: '1' };
      const newsletterAttributes = { id: '1', userId: user.id };
      const newsletter = { ...newsletterFactory, ...newsletterAttributes };
      const requestBody = {
        name: newsletter.name,
        content: newsletter.content,
      };

      withAuth.mockImplementation((callback) => callback(user));
      createRecord.mockResolvedValue(newsletter);

      await createNewsletter(requestBody);

      expect(createRecord).toHaveBeenCalledWith({
        name: newsletter.name,
        content: newsletter.content,
        user: { connect: { id: user.id } },
      });
    });
  });

  describe('given invalid params', () => {
    it('returns invalid params error', async () => {
      const user = { id: '1' };
      const content = newsletterFactory.content;
      const requestBody = {
        name: null,
        content: content,
      };

      withAuth.mockImplementation((callback) => callback(user));
      createRecord.mockImplementation(() => {
        throw new Prisma.PrismaClientValidationError();
      });
      await expect(createNewsletter(requestBody)).rejects.toThrow(
        invalidParamsMessage
      );

      expect(createRecord).toHaveBeenCalledWith({
        name: null,
        content: content,
        user: { connect: { id: user.id } },
      });
    });
  });
});

describe('updateNewsletter', () => {
  const user = { ...userFactory, id: '1' };
  const newsletter = { id: '2' };
  const data = {
    name: 'New name',
    content: 'New content',
    id: newsletter.id,
  };
  const where = {
    id: newsletter.id,
    user: user,
  };
  const args = { where, data };

  beforeEach(() => {
    withAuth.mockImplementation((callback) => callback(user));
    updateRecord.mockResolvedValue({ count: 1 });
  });

  describe('newsletter exists', () => {
    it('delete the newsletter', async () => {
      await updateNewsletter(data);

      expect(updateRecord).toHaveBeenCalledWith(args);
    });
  });

  describe('newsletter NOT exists', () => {
    beforeEach(() => {
      updateRecord.mockResolvedValue({ count: 0 });
    });

    it('returns error', async () => {
      await expect(updateNewsletter(data)).rejects.toThrow(
        'Newsletter not exists'
      );
      expect(updateRecord).toHaveBeenCalledWith(args);
    });
  });
});

describe('deleteNewsletter', () => {
  const user = { id: '1' };
  const newsletter = { id: '2' };

  beforeEach(() => {
    withAuth.mockImplementation((callback) => callback(user));
    deleteRecord.mockResolvedValue({ count: 1 });
  });

  describe('newsletter exists', () => {
    it('delete the newsletter', async () => {
      await deleteNewsletter(newsletter.id);

      expect(deleteRecord).toHaveBeenCalledWith(newsletter.id, user.id);
    });
  });

  describe('newsletter NOT exists', () => {
    beforeEach(() => {
      deleteRecord.mockResolvedValue({ count: 0 });
    });

    it('returns error', async () => {
      await expect(deleteNewsletter(newsletter.id)).rejects.toThrow(
        'Newsletter not exists'
      );

      expect(deleteRecord).toHaveBeenCalledWith(newsletter.id, user.id);
    });
  });
});

describe('sendNewsletter', () => {
  describe('given invalid email', () => {
    it('returns invalid email error', async () => {
      const user = { id: '1' };
      const requestBody = {
        email: 'devnimblehq.co',
        ids: ['1'],
      };

      withAuth.mockImplementation((callback) => callback(user));

      await expect(sendNewsletter(requestBody)).rejects.toThrow(
        'Invalid email'
      );
    });

    describe('given valid email', () => {
      describe('given empty newsletter ids', () => {
        it('returns invalid newsletter error', async () => {
          const user = { id: '1' };
          const requestBody = {
            email: 'dev@nimblehq.co',
            ids: [],
          };

          withAuth.mockImplementation((callback) => callback(user));

          await expect(sendNewsletter(requestBody)).rejects.toThrow(
            'Invalid newsletters'
          );
        });
      });

      describe('given invalid newsletter ids', () => {
        it('returns invalid newsletter error', async () => {
          const user = { id: '1' };
          const requestBody = {
            email: 'dev@nimblehq.co',
            ids: ['1'],
          };

          withAuth.mockImplementation((callback) => callback(user));
          countNewsletters.mockResolvedValue(0);

          await expect(sendNewsletter(requestBody)).rejects.toThrow(
            'Invalid newsletters'
          );
        });
      });

      describe('given valid newsletter ids', () => {
        it('triggers sendMail', async () => {
          const user = { id: '1', name: 'Dave' };
          const requestBody = {
            email: 'dev@nimblehq.co',
            ids: ['1'],
          };

          withAuth.mockImplementation((callback) => callback(user));
          countNewsletters.mockResolvedValue(requestBody.ids.length);

          await sendNewsletter(requestBody);

          expect(sendMailQueue.add).toHaveBeenCalledWith('sendMail', {
            ids: requestBody.ids,
            to: requestBody.email,
            senderId: user.id,
            senderName: user.name,
          });
        });
      });
    });
  });
});
