/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Newsletter } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { action, loader } from './_app.newsletter.update.$id';
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

describe('Newsletter update', () => {
  describe('loader', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const userAttributes = { id: '1' };
    const user = { ...userFactory, ...userAttributes };

    (appHandler as jest.Mock).mockImplementation((req, callback) =>
      callback(user)
    );

    describe('given valid newsletter params', () => {
      it('returns a newsletter', async () => {
        const newsletterAttributes = { userId: '1' };
        const newsletter = { ...newsletterFactory, ...newsletterAttributes };

        prismaMock.newsletter.findFirst.mockResolvedValue(newsletter);

        const request = makeRequest({
          url: `/newsletter/update/${newsletter.id}`,
          method: 'get',
        });

        const result: any = await loader({
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
  });

  describe('action', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('given the user is authenticated', () => {
      const userAttributes = { id: '1' };
      const user = { ...userFactory, ...userAttributes };

      (appHandler as jest.Mock).mockImplementation((req, callback) =>
        callback(user)
      );

      describe('given valid newsletter params', () => {
        it('update a newsletter', async () => {
          const updateResultMock = { count: 1 };
          const newsletterAttributes = { userId: '1' };
          const newsletter = {
            ...newsletterFactory,
            ...newsletterAttributes,
          };

          prismaMock.newsletter.findUnique.mockResolvedValue(newsletter);
          prismaMock.newsletter.updateMany.mockResolvedValue(updateResultMock);

          const body = new URLSearchParams({
            name: newsletter.name,
            content: newsletter.content,
          });

          const request = makeRequest({
            url: `/newsletter/update/${newsletter.id}`,
            method: 'put',
            body,
          });

          const result: any = await action({
            request,
            params: {},
            context: {},
          });

          expect(await result.json()).toMatchObject({
            name: expect.any(String),
            content: expect.any(String),
          });
        });
      });

      describe('given an invalid newsletter params', () => {
        it('returns error NOT FOUND', async () => {
          const newsletter = { ...newsletterFactory };

          const body = new URLSearchParams({
            name: newsletter.name,
            content: newsletter.content,
          });

          const request = makeRequest({
            url: `/newsletter/update/${newsletter.id}`,
            method: 'put',
            body,
          });

          try {
            await action({
              request,
              params: {},
              context: {},
            });
          } catch (error) {
            expect(error).toMatchObject({
              status: StatusCodes.NOT_FOUND,
              statusText: 'Newsletter not found',
            });
          }
        });
      });
    });
  });
});
