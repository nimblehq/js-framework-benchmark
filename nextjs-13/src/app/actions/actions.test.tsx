/**
 * @jest-environment node
 */
import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { newsletterFactory } from '@test/factories/newsletter.factory';
import { userFactory } from '@test/factories/user.factory';
import { errorMessageList } from 'lib/request/error';
import withAuth from 'lib/withAuth/withAuth';
import {
  createNewsletter as createRecord,
  updateNewsletter as updateRecord,
  deleteNewsletter as deleteRecord,
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
    addBulk: jest.fn(),
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
      const params = {
        name: newsletter.name,
        content: newsletter.content,
      };

      withAuth.mockImplementation((callback) => callback(user));
      createRecord.mockResolvedValue(newsletter);

      await createNewsletter(params);

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
      const params = {
        name: null,
        content: content,
      };

      withAuth.mockImplementation((callback) => callback(user));
      createRecord.mockImplementation(() => {
        throw new Prisma.PrismaClientValidationError();
      });
      await expect(createNewsletter(params)).rejects.toThrow(
        errorMessageList[StatusCodes.UNPROCESSABLE_ENTITY]
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
  describe('newsletter exists', () => {
    it('updates the newsletter', async () => {
      const user = { ...userFactory, id: '1' };
      const newsletter = { id: '2' };
      const data = {
        id: newsletter.id,
        name: 'New name',
        content: 'New content',
      };
      const where = {
        id: newsletter.id,
        user: user,
      };

      withAuth.mockImplementation((callback) => callback(user));
      updateRecord.mockResolvedValue({ count: 1 });

      await updateNewsletter(data);

      expect(updateRecord).toHaveBeenCalledWith({ where, data });
    });
  });

  describe('newsletter does NOT exist', () => {
    it('returns error', async () => {
      const user = { ...userFactory, id: '1' };
      const newsletter = { id: '2' };
      const data = {
        id: newsletter.id,
        name: 'New name',
        content: 'New content',
      };
      const where = {
        id: newsletter.id,
        user: user,
      };

      withAuth.mockImplementation((callback) => callback(user));
      updateRecord.mockResolvedValue({ count: 0 });

      await expect(updateNewsletter(data)).rejects.toThrow(
        'Newsletter could not be updated'
      );
      expect(updateRecord).toHaveBeenCalledWith({ where, data });
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
    it('deletes the newsletter', async () => {
      await deleteNewsletter(newsletter.id);

      expect(deleteRecord).toHaveBeenCalledWith(newsletter.id, user.id);
    });
  });

  describe('newsletter does NOT exist', () => {
    beforeEach(() => {
      deleteRecord.mockResolvedValue({ count: 0 });
    });

    it('returns error', async () => {
      await expect(deleteNewsletter(newsletter.id)).rejects.toThrow(
        'Newsletter could not be deleted'
      );

      expect(deleteRecord).toHaveBeenCalledWith(newsletter.id, user.id);
    });
  });
});

describe('sendNewsletter', () => {
  describe('given invalid email', () => {
    it('returns invalid email error', async () => {
      const user = { id: '1' };
      const params = {
        email: 'devnimblehq.co',
        ids: ['1'],
      };

      withAuth.mockImplementation((callback) => callback(user));

      await expect(sendNewsletter(params)).rejects.toThrow('Invalid email');
    });

    describe('given valid email', () => {
      describe('given empty newsletter ids', () => {
        it('returns invalid newsletter error', async () => {
          const user = { id: '1' };
          const params = {
            email: 'dev@nimblehq.co',
            ids: [],
          };

          withAuth.mockImplementation((callback) => callback(user));

          await expect(sendNewsletter(params)).rejects.toThrow(
            'Invalid newsletters'
          );
        });
      });

      describe('given valid newsletter ids', () => {
        it('triggers sendMail', async () => {
          const user = { id: '1', name: 'Dave' };
          const params = {
            email: 'dev@nimblehq.co',
            ids: ['1'],
          };

          withAuth.mockImplementation((callback) => callback(user));

          await sendNewsletter(params);

          expect(sendMailQueue.addBulk).toHaveBeenCalledWith([
            {
              data: {
                id: params.ids[0],
                to: params.email,
                senderId: user.id,
                senderName: user.name,
              },
              name: 'sendMail',
            },
          ]);
        });
      });
    });
  });
});
