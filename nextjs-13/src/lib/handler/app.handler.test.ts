/**
 * @jest-environment node
 */

import { StatusCodes } from 'http-status-codes';
import * as nextAuthJwtModule from 'next-auth/jwt';

import { dbClientMock } from '@test/database';
import { userFactory } from '@test/factories/user.factory';

import appHandler from './app.handler';

describe('appHandler', () => {
  const req = { json: jest.fn() };
  const body = { key: 'value' };
  const callback = jest.fn();
  const userAttributes = { id: '1' };

  let user = { ...userFactory, ...userAttributes };
  let mockGetToken = jest.fn(
    async () =>
      new Promise((resolve) => {
        resolve({
          userId: '1',
        });
      })
  );

  const mock = () => {
    req.json.mockResolvedValue(body);
    jest.spyOn(nextAuthJwtModule, 'getToken').mockImplementation(mockGetToken);
    dbClientMock.user.findUnique.mockResolvedValue(user);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('given token is valid', () => {
    describe('given user exists', () => {
      beforeEach(() => {
        mock();
      });

      it('calls callback with user and body', async () => {
        await appHandler(req, callback);
        expect(callback).toHaveBeenCalledWith(user, req);
      });
    });

    describe('given user NOT exists', () => {
      beforeEach(() => {
        user = undefined;

        mock();
      });

      it('returns invalid token error', async () => {
        const res = await appHandler(req, callback);
        expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
      });
    });
  });

  describe('given token is invalid', () => {
    beforeEach(() => {
      mockGetToken = jest.fn(
        async () =>
          new Promise((resolve) => {
            resolve({});
          })
      );

      mock();
    });

    it('returns invalid token error', async () => {
      const res = await appHandler(req, callback);
      expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });
});
