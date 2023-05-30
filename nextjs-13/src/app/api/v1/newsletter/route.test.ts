/**
 * @jest-environment node
 */

import { Newsletter } from '@prisma/client';

import { dbClientMock } from '@test/database';
import { newsletterFactory } from '@test/factories/newsletter.factory';

import { POST } from './route';
import baseHandler from 'lib/handler/base.handler';

jest.mock('lib/handler/base.handler');

describe('POST /v1/newsletter', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('given an authenticated newsletter', () => {
    describe('given valid params', () => {
      it('creats a newsletter', async () => {
        const user = { id: '1' };

        // const baseHandler = jest.fn().mockImplementation((req, callback) => callback(user));

        const newsletterAttributes = { id: '1', userId: user.id };
        const newsletter = { ...newsletterFactory, ...newsletterAttributes };
        dbClientMock.newsletter.create.mockResolvedValue(newsletter);

        const res = await POST({
          name: newsletter.name,
          content: newsletter.content,
        });
        const body = await res.json();

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
