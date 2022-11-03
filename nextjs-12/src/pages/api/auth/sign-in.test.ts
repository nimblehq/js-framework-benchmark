import { agent } from 'supertest';

import { ApiTestServer, createApiServer } from '@test/api';

import AuthGoogleService from '../../../services/auth/google.service';
import signInApiHandler from './sign-in';

jest.mock('../../../services/auth/google.service');

describe('GET /auth/sign-in', () => {
  let server: ApiTestServer;

  beforeEach(async () => {
    server = createApiServer(signInApiHandler);
  });

  afterEach(() => {
    server.close();
    jest.restoreAllMocks();
  });

  describe('given a valid configuration', () => {
    it('calls the auth service', async () => {
      const mockAuthService = jest.spyOn(
        AuthGoogleService.prototype,
        'authenticate'
      );

      await agent(server).get('/api/auth/sign-in');

      expect(mockAuthService).toHaveBeenCalled();
    });
  });
});
