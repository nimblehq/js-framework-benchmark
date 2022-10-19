import { agent } from 'supertest';

import { ApiTestServer, createApiServer } from '@test/api';
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

      expect(response.headers['set-cookie'][0]).toMatch(/^next-newsletter=/);
      expect(response.status).toBe(307);
    });
  });
});
