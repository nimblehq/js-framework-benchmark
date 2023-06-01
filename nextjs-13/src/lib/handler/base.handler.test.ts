/**
 * @jest-environment node
 */

import * as nextAuthJwtModule from 'next-auth/jwt';

import { dbClientMock } from '@test/database';
import { userFactory } from '@test/factories/user.factory';

import baseHandler from './base.handler';

describe('baseHandler', () => {
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
        await baseHandler(req, callback);
        expect(callback).toHaveBeenCalledWith(user, body);
      });
    });

    describe('given user NOT exists', () => {
      beforeEach(() => {
        user = undefined;

        mock();
      });

      it('returns invalid token error', async () => {
        const res = await baseHandler(req, callback);
        expect(res.status).toBe(401);
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
      const res = await baseHandler(req, callback);
      expect(res.status).toBe(401);
    });
  });
});
