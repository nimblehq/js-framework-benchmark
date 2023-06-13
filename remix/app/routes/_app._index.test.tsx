/**
 * @jest-environment node
 */

import { loader } from './_app._index';
import appHandler from '../lib/handler/app.handler';
import { prismaMock } from '../tests/database';
import { newsletterFactory } from '../tests/factories/newsletter.factory';
import { userFactory } from '../tests/factories/user.factory';
import { makeRequest } from '../tests/helpers/request';

jest.mock('../config/auth.server', () => ({
  authenticator: {
    isAuthenticated: jest.fn(),
  },
}));

jest.mock('../lib/handler/app.handler');

describe('Root Page', () => {
  describe('loader', () => {
    it('returns a list of newsletters', async () => {
      const userAtttributes = { id: '1' };
      const newsletterAttributes = { userId: '1' };

      const user = { ...userFactory, ...userAtttributes };
      const newsletter = { ...newsletterFactory, ...newsletterAttributes };

      const newsletters = Array(5).fill(newsletter);

      (appHandler as jest.Mock).mockImplementation((req, callback) =>
        callback(user)
      );
      prismaMock.newsletter.findMany.mockResolvedValue(newsletters);

      const request = makeRequest({
        url: '/newsletter/create',
        method: 'get',
      });

      const response = await loader({ request, params: {}, context: {} });

      expect(response).toEqual({ newsletters: newsletters });
    });
  });
});
