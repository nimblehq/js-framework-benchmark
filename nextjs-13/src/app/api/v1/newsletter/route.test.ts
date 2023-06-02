/**
 * @jest-environment node
 */
import { Newsletter, Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { dbClientMock } from '@test/database';
import { newsletterFactory } from '@test/factories/newsletter.factory';
import appHandler from 'lib/handler/app.handler';

import { POST } from './route';

jest.mock('lib/handler/app.handler');

describe('POST /v1/newsletter', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('given valid params', () => {
    it('creates a newsletter', async () => {
      const user = { id: '1' };
      const newsletterAttributes = { id: '1', userId: user.id };
      const newsletter = { ...newsletterFactory, ...newsletterAttributes };
      const requestBody = {
        json: () => {
          return {
            name: newsletter.name,
            content: newsletter.content,
          };
        },
      };

      appHandler.mockImplementation((req, callback) =>
        callback(user, requestBody)
      );
      dbClientMock.newsletter.create.mockResolvedValue(newsletter);

      const res = await POST(requestBody);
      const responseBody = await res.json();

      expect(res.status).toBe(StatusCodes.OK);
      expect(responseBody.newsletter).toMatchObject<Newsletter>({
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
    it('return invalid data error', async () => {
      const user = { id: '1' };
      const requestBody = {
        json: () => {
          return {
            name: null,
            content: newsletterFactory.content,
          };
        },
      };

      appHandler.mockImplementation((req, callback) =>
        callback(user, requestBody)
      );
      dbClientMock.newsletter.create.mockImplementation(() => {
        throw new Prisma.PrismaClientValidationError();
      });

      const res = await POST(requestBody);
      const responseBody = await res.json();

      expect(res.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(responseBody).toMatchObject({
        message: 'Invalid params',
      });
    });
  });
});
