/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { userFactory } from '@test/factories/user.factory';
import appHandler from 'lib/handler/app.handler';
import {
  deleteNewsletter,
  updateNewsletter,
} from 'repositories/newsletter.repository';

import { DELETE, PUT } from './route';

jest.mock('lib/handler/app.handler');
jest.mock('repositories/newsletter.repository');

describe('DELETE /v1/newsletter/:id', () => {
  let user: { id: string };
  let newsletter: { id: string };

  beforeEach(() => {
    user = { id: '1' };
    newsletter = { id: '2' };

    appHandler.mockImplementation((_, callback) => callback(user, {}));
    deleteNewsletter.mockResolvedValue({ count: 1 });
  });

  describe('newsletter exists', () => {
    it('deletes the newsletter', async () => {
      const response = await DELETE({}, { params: { id: newsletter.id } });

      expect(deleteNewsletter).toHaveBeenCalledWith(newsletter.id, user.id);
      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('newsletter does NOT exist', () => {
    beforeEach(() => {
      deleteNewsletter.mockResolvedValue({ count: 0 });
    });

    it('returns error', async () => {
      const response = await DELETE({}, { params: { id: newsletter.id } });
      const responseBody = await response.json();

      expect(deleteNewsletter).toHaveBeenCalledWith(newsletter.id, user.id);
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(responseBody).toMatchObject({
        message: 'Newsletter could not be deleted',
      });
    });
  });
});

describe('PUT /v1/newsletter/:id', () => {
  describe('newsletter exists', () => {
    it('updates the newsletter', async () => {
      const user = { ...userFactory, id: '1' };
      const newsletter = { id: '2' };
      const data = {
        name: 'New name',
        content: 'New content',
      };
      const where = {
        id: newsletter.id,
        user: user,
      };

      appHandler.mockImplementation((_, callback) => callback(user, {}));
      updateNewsletter.mockResolvedValue({ count: 1 });

      const response = await PUT(
        { json: () => data },
        { params: { id: newsletter.id } }
      );

      expect(updateNewsletter).toHaveBeenCalledWith({ where, data });
      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('newsletter does NOT exist', () => {
    it('returns error', async () => {
      const user = { ...userFactory, id: '1' };
      const newsletter = { id: '2' };
      const data = {
        name: 'New name',
        content: 'New content',
      };
      const where = {
        id: newsletter.id,
        user: user,
      };

      appHandler.mockImplementation((_, callback) => callback(user, {}));
      updateNewsletter.mockResolvedValue({ count: 0 });

      const response = await PUT(
        { json: () => data },
        { params: { id: newsletter.id } }
      );
      const responseBody = await response.json();

      expect(updateNewsletter).toHaveBeenCalledWith({ where, data });
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(responseBody).toMatchObject({
        message: 'Newsletter could not be updated',
      });
    });
  });
});
