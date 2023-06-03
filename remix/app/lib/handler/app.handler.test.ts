/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import appHandler from './app.handler';
import { authenticator } from '../../config/auth.server';
import { prismaMock } from '../../tests/database';
import { userFactory } from '../../tests/factories/user.factory';

jest.mock('../../config/auth.server', () => ({
  authenticator: {
    isAuthenticated: jest.fn(),
  },
}));

const mockRequest = {};
const mockCallback = jest.fn();

describe('appHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('givens a valid user authentication', () => {
    it('calls callback return a user information', async () => {
      const user = { ...userFactory };

      prismaMock.user.findUnique.mockResolvedValue(user);
      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);

      await appHandler(mockRequest as any, mockCallback);

      expect(authenticator.isAuthenticated).toHaveBeenCalledWith(mockRequest);
      expect(mockCallback).toHaveBeenCalledWith(user);
    });
  });

  describe('givens a invalid user authentication', () => {
    it('throws a Response with 401 status', async () => {
      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(null);

      try {
        (await appHandler(mockRequest as any, mockCallback)) as Response;
      } catch (error: any) {
        expect(error.status).toBe(401);
      }
    });
  });
});
