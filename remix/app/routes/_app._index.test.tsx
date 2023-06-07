/**
 * @jest-environment node
 */

import { loader } from './_app._index';
import { authenticator } from '../config/auth.server';
import { prismaMock } from '../tests/database';
import { newsletterFactory } from '../tests/factories/newsletter.factory';
import { userFactory } from '../tests/factories/user.factory';

jest.mock('../config/auth.server', () => ({
  authenticator: {
    isAuthenticated: jest.fn(),
  },
}));

describe('Root Page', () => {
  describe('loader', () => {
    it('returns a list of newsletters', async () => {
      const user = { ...userFactory };
      const newsletters = Array(5).fill(newsletterFactory);

      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);
      prismaMock.newsletter.findMany.mockResolvedValue(newsletters);

      const response = await loader();

      expect(response).toEqual({ newsletters: newsletters });
    });
  });
});
