/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Newsletter } from '@prisma/client';

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

  const user = { ...userFactory };
  const newsletter = { ...newsletterFactory };

  (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);

  describe('givens a newsletter data', () => {
    it('creates a newsletter', async () => {
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

      expect(await result.json()).toMatchObject<Newsletter>({
        id: newsletter.id,
        name: expect.any(String),
        content: expect.any(String),
        userId: newsletter.userId,
        createAt: expect.any(String),
        updateAt: expect.any(String),
      });
    });
  });

  describe('givens a newsletter data WITHOUT content value', () => {
    it('returns required content value', async () => {
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
