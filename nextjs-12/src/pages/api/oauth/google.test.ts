import { agent } from 'supertest';

import {
  ApiTestServer,
  createApiServer,
  COOKIE_REGEX_PATTERN,
} from '@test/api';
import { userFactory } from '@test/factories/user.factory';

import AuthGoogleService from '../../../services/auth/google.service';
import googleApiHandler from './google';

describe('GET /oauth/google', () => {
  let server: ApiTestServer;

  beforeEach(async () => {
    server = createApiServer(googleApiHandler);
  });

  afterEach(() => {
    server.close();
  });

  describe('given a succesful user authentication', () => {
    it('saves the user session in a cookie', async () => {
      const userAttributes = {
        id: '1',
      };
      const user = { ...userFactory, ...userAttributes };

      AuthGoogleService.verifyOrCreateUser = jest.fn().mockReturnValue(user);

      const response = await agent(server).get('/api/oauth/google');
      const cookieValue =
        response.headers['set-cookie'][0].match(COOKIE_REGEX_PATTERN) ??
        undefined;

      expect(cookieValue).not.toBeNull();
      expect(response.status).toBe(307);
    });
  });
});
