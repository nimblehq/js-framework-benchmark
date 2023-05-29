/**
 * @jest-environment node
 */

import { Newsletter } from '@prisma/client';
import * as nextAuthJwtModule from 'next-auth/jwt';

import { dbClientMock } from '@test/database';
import { newsletterFactory } from '@test/factories/newsletter.factory';

import { POST } from './route';

describe('POST /v1/newsletter', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('given an authenticated newsletter', () => {
    describe('given valid params', () => {
      it('creats a newsletter', async () => {
        const userAttributes = { userId: '1' };

        const mockGetToken = jest.fn(
          async () =>
            new Promise((resolve) => {
              resolve(userAttributes);
            })
        );

        jest
          .spyOn(nextAuthJwtModule, 'getToken')
          .mockImplementation(mockGetToken);

        const newsletterAttributes = { id: '1', ...userAttributes };
        const newsletter = { ...newsletterFactory, ...newsletterAttributes };
        dbClientMock.newsletter.create.mockResolvedValue(newsletter);

        const res = await POST({
          name: newsletter.name,
          content: newsletter.content,
        });
        const body = await res.json();

        expect(mockGetToken).toBeCalled();
        expect(res.status).toBe(200);
        expect(body.newsletter).toMatchObject<Newsletter>({
          id: newsletterAttributes.id,
          name: expect.any(String),
          content: expect.any(String),
          userId: newsletterAttributes.userId,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
    });
    describe('given invalid params', () => {
    });
  });

  // describe('given an unauthenticated newsletter', () => {
  //   it('returns an unauthorized error', async () => {
  //     const res = await GET({});

  //     expect(res.status).toBe(401);
  //   });
  // });
});
