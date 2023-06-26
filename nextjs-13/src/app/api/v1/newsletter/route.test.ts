/**
 * @jest-environment node
 */
import { Newsletter } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { newsletterFactory } from '@test/factories/newsletter.factory';
import appHandler from 'lib/handler/app.handler';
import { queryNewsletterList } from 'repositories/newsletter.repository';

import { GET } from './route';

jest.mock('lib/handler/app.handler');
jest.mock('repositories/newsletter.repository');

describe('GET /v1/newsletter', () => {
  it('returns a list of newsletters', async () => {
    const user = { id: '1' };
    const newsletterAttributes = { id: '1', userId: user.id };
    const newsletter = { ...newsletterFactory, ...newsletterAttributes };
    appHandler.mockImplementation((req, callback) => callback(user, {}));
    queryNewsletterList.mockResolvedValue([newsletter]);

    const response = await GET({});
    const responseBody = await response.json();

    expect(queryNewsletterList).toHaveBeenCalledWith(user.id);
    expect(response.status).toBe(StatusCodes.OK);
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
