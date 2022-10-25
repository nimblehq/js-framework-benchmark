import { User } from '@prisma/client';
import { agent } from 'supertest';

import { ApiTestServer, createApiServer, createCookieFor } from '@test/api';
import { dbClientMock } from '@test/database';
import { userFactory } from '@test/factories/user.factory';

import meApiHandler from './me';

describe('GET /v1/me', () => {
  let server: ApiTestServer;

  beforeEach(async () => {
    server = createApiServer(meApiHandler);
  });

  afterEach(() => {
    server.close();
  });

  describe('given an authenticated user', () => {
    it('returns a user', async () => {
      const userAttributes = {
        id: '1',
      };
      const user = { ...userFactory, ...userAttributes };
      dbClientMock.user.findUnique.mockResolvedValue(user);

      const cookie = await createCookieFor(userAttributes);

      const response = await agent(server)
        .set('Cookie', cookie)
        .get('/api/v1/me');

      expect(response.status).toBe(200);
      expect(response.body.user).toMatchObject<User>({
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
      const response = await agent(server).get('/api/v1/me');

      expect(response.status).toBe(401);
    });
  });
});
