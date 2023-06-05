/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import appHandler from 'lib/handler/app.handler';
import { deleteNewsletter } from 'repositories/newsletter.repository';

import { DELETE } from './route';

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
    it('delete the newsletter', async () => {
      const res = await DELETE({}, { params: { id: newsletter.id } });

      expect(deleteNewsletter).toHaveBeenCalledWith(newsletter.id, user.id);
      expect(res.status).toBe(StatusCodes.OK);
    });
  });

  describe('newsletter NOT exists', () => {
    beforeEach(() => {
      deleteNewsletter.mockResolvedValue({ count: 0 });
    });

    it('returns error', async () => {
      const res = await DELETE({}, { params: { id: newsletter.id } });
      const responseBody = await res.json();

      expect(deleteNewsletter).toHaveBeenCalledWith(newsletter.id, user.id);
      expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(responseBody).toMatchObject({
        message: 'Newsletter not exists',
      });
    });
  });
});
