/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Newsletter } from '@prisma/client';

import { action } from './_app.newsletter.update.$id';
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

describe('POST /newsletter/update/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('givens valid newsletter params with a creator user', () => {
    it('update a newsletter', async () => {
      const userAttributes = { id: '1' };
      const newsletterAttributes = { userId: '1' };
      const user = { ...userFactory, ...userAttributes };
      const newsletter = { ...newsletterFactory, ...newsletterAttributes };

      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.newsletter.findUnique.mockResolvedValue(newsletter);
      prismaMock.newsletter.update.mockResolvedValue(newsletter);

      const body = new URLSearchParams({
        name: newsletter.name,
        content: newsletter.content,
      });

      const request = makeRequest({
        url: `/newsletter/update/${newsletter.id}`,
        method: 'post',
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

  describe('given an invalid newsletter params', () => {
    it('returns error NOT FOUND', async () => {
      const user = { ...userFactory };
      const newsletter = { ...newsletterFactory };

      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);
      prismaMock.user.findUnique.mockResolvedValue(user);

      const body = new URLSearchParams({
        name: newsletter.name,
        content: newsletter.content,
      });

      const request = makeRequest({
        url: `/newsletter/update/${newsletter.id}`,
        method: 'post',
        body,
      });

      const result: any = await action({
        request,
        params: {},
        context: {},
      });

      expect(await result.json()).toMatchObject({
        fieldErrors: { Error: 'Newsletter not found' },
      });
    });
  });

  describe('givens valid newsletter params with a NOT creator user', () => {
    it('returns error NO PERMISSION', async () => {
      const user = { ...userFactory };
      const newsletter = { ...newsletterFactory };

      (authenticator.isAuthenticated as jest.Mock).mockResolvedValue(user);
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.newsletter.findUnique.mockResolvedValue(newsletter);
      prismaMock.newsletter.update.mockResolvedValue(newsletter);

      const body = new URLSearchParams({
        name: newsletter.name,
        content: newsletter.content,
      });

      const request = makeRequest({
        url: `/newsletter/update/${newsletter.id}`,
        method: 'post',
        body,
      });

      const result: any = await action({
        request,
        params: {},
        context: {},
      });

      expect(await result.json()).toMatchObject({
        fieldErrors: { Error: 'You are not allowed to update this newsletter' },
      });
    });
  });
});
