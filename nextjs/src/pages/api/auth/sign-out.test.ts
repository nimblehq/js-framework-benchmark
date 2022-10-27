import { agent } from 'supertest';

import {
  ApiTestServer,
  createApiServer,
  createCookieFor,
  COOKIE_REGEX_PATTERN,
} from '@test/api';
import { userFactory } from '@test/factories/user.factory';

import signOutApiHandler from './sign-out';

describe('DELETE /api/auth/sign-out', () => {
  let server: ApiTestServer;

  beforeEach(async () => {
    server = createApiServer(signOutApiHandler);
  });

  afterEach(() => {
    server.close();
    jest.restoreAllMocks();
  });

  describe('given a session', () => {
    it('destroys the session', async () => {
      const cookie = await createCookieFor(userFactory);

      const response = await agent(server)
        .delete('/api/auth/sign-out')
        .set('Cookie', cookie);
      const cookieValue =
        response.headers['set-cookie'][0].match(COOKIE_REGEX_PATTERN);

      expect(cookieValue).toBeNull();
    });
  });
});
