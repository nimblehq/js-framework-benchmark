/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';

import { action } from './_app.newsletter.create';
import { authenticator } from '../config/auth.server';
import { prismaMock } from '../tests/database';
import { newsletterFactory } from '../tests/factories/newsletter.factory';
import { userFactory } from '../tests/factories/user.factory';
import { makeRequest } from '../tests/helpers/request';

jest.mock('../config/auth.server', () => ({
  authenticator: {
    isAuthenticated: jest.fn(),
  },
}));

describe('POST /newsletter/create', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('given valid newsletter params', () => {
    it('redirect to main page, when a newsletter is successfully created', async () => {
      const user = { ...userFactory };
      const newsletter = { ...newsletterFactory };

      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.newsletter.create.mockResolvedValue(newsletter);

      const body = new URLSearchParams({
        name: newsletter.name,
        content: newsletter.content,
      });

      const request = makeRequest({
        url: '/newsletter/create',
        method: 'POST',
        body,
      });

      const result: any = await action({
        request,
        params: {},
        context: {},
      });

      expect(await result.status).toBe(StatusCodes.MOVED_TEMPORARILY);
      expect(await result.headers.get('Location')).toBe('/');
    });
  });

  describe('given a newsletter WITHOUT content params', () => {
    it('returns required content value', async () => {
      const user = { ...userFactory };
      const newsletter = { ...newsletterFactory };

      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.newsletter.create.mockResolvedValue(newsletter);

      const body = new URLSearchParams({
        name: newsletter.name,
      });

      const request = makeRequest({
        url: '/newsletter/create',
        method: 'POST',
        body,
      });

      const result: any = await action({
        request,
        params: {},
        context: {},
      });

      expect(await result.json()).toMatchObject({
        fieldErrors: { content: 'Required' },
      });
    });
  });
});
