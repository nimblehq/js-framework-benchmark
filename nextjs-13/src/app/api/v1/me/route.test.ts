import { User } from '@prisma/client';
import { dbClientMock } from '@test/database';
import { userFactory } from '@test/factories/user.factory';
import * as nextAuthJwtModule from "next-auth/jwt";

import { GET } from './route';

describe('GET /v1/me', () => {
  describe('given an authenticated user', () => {
    it('returns a user', async () => {
      const userAttributes = {
        id: '1',
      };
      const user = { ...userFactory, ...userAttributes };
      dbClientMock.user.findUnique.mockResolvedValue(user);

      const mockGetToken = jest.fn(
        async () =>
          new Promise((resolve) => {
            resolve({
              userId: '1'
            });
          })
      );
      jest.spyOn(nextAuthJwtModule, "getToken").mockImplementation(mockGetToken);

      const res = await GET({});
      const body = await res.json()

      expect(mockGetToken).toBeCalled()
      expect(res.status).toBe(200);
      expect(body.user).toMatchObject<User>({
        id: '1',
        name: expect.any(String),
        email: expect.any(String),
        avatarUrl: expect.any(String),
        createdAt: expect.any(String),
      });
    });
  });

  describe('given an unauthenticated user', () => {
    it('returns an unauthorized error', async () => {
      const res = await GET({});

      expect(res.status).toBe(401);
    });
  });
});
