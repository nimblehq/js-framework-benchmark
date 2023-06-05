/**
 * @jest-environment node
 */
import { Newsletter, Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { newsletterFactory } from '@test/factories/newsletter.factory';
import appHandler from 'lib/handler/app.handler';
import {
  createNewsletter,
  queryNewsletterByUserId,
} from 'repositories/newsletter.repository';

import { GET, POST } from './route';

jest.mock('lib/handler/app.handler');
jest.mock('repositories/newsletter.repository');

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

      createNewsletter.mockResolvedValue(newsletter);

      const res = await POST(requestBody);
      const responseBody = await res.json();

      expect(createNewsletter).toHaveBeenCalledWith({
        name: newsletter.name,
        content: newsletter.content,
        user: { connect: { id: user.id } },
      });
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
      const content = newsletterFactory.content;
      const requestBody = {
        json: () => {
          return {
            name: null,
            content: content,
          };
        },
      };

      appHandler.mockImplementation((req, callback) =>
        callback(user, requestBody)
      );
      createNewsletter.mockImplementation(() => {
        throw new Prisma.PrismaClientValidationError();
      });

      const res = await POST(requestBody);
      const responseBody = await res.json();

      expect(createNewsletter).toHaveBeenCalledWith({
        name: null,
        content: content,
        user: { connect: { id: user.id } },
      });
      expect(res.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(responseBody).toMatchObject({
        message: 'Invalid params',
      });
    });
  });
});

describe('GET /v1/newsletter', () => {
  it('returns a list of newsletters', async () => {
    const user = { id: '1' };
    const newsletterAttributes = { id: '1', userId: user.id };
    const newsletter = { ...newsletterFactory, ...newsletterAttributes };
    appHandler.mockImplementation((req, callback) => callback(user, {}));
    queryNewsletterByUserId.mockResolvedValue([newsletter]);

    const res = await GET({});
    const responseBody = await res.json();

    expect(queryNewsletterByUserId).toHaveBeenCalledWith(user.id);
    expect(res.status).toBe(StatusCodes.OK);
    expect(responseBody.records[0]).toMatchObject<Newsletter>({
      id: newsletterAttributes.id,
      name: expect.any(String),
      content: expect.any(String),
      userId: newsletterAttributes.userId,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
