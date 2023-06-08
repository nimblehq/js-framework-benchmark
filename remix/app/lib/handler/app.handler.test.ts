/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';

import appHandler from './app.handler';
import { authenticator } from '../../config/auth.server';
import { getSession } from '../../config/session.server';
import { prismaMock } from '../../tests/database';
import { userFactory } from '../../tests/factories/user.factory';

jest.mock('../../config/auth.server', () => ({
  authenticator: {
    isAuthenticated: jest.fn(),
  },
}));

jest.mock('../../config/session.server', () => ({
  getSession: jest.fn(),
}));

describe('appHandler', () => {
  const mockRequest: any = {
    headers: {
      get: jest.fn(() => 'Cookie Value'),
    },
  };

  const mockCallback = jest.fn();
  const mockCookie = 'test-cookie';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('given an authenticated user', () => {
    it('calls callback return a user information', async () => {
      const user = { ...userFactory };

      prismaMock.user.findUnique.mockResolvedValue(user);
      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);
      (getSession as jest.Mock).mockResolvedValueOnce(mockCookie);

      await appHandler(mockRequest as any, mockCallback);

      expect(authenticator.isAuthenticated).toHaveBeenCalledWith(mockRequest);
      expect(mockCallback).toHaveBeenCalledWith(user, mockCookie);
    });
  });

  describe('given a non-authenticated user', () => {
    it('throws a Response with 401 status', async () => {
      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(null);

      try {
        (await appHandler(mockRequest as any, mockCallback)) as Response;
      } catch (error: any) {
        expect(error.status).toBe(StatusCodes.UNAUTHORIZED);
      }
    });
  });
});
