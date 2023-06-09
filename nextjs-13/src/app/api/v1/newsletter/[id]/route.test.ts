/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { newsletterFactory } from '@test/factories/newsletter.factory';
import { findNewsletter } from 'repositories/newsletter.repository';

import { GET } from './route';

jest.mock('lib/handler/app.handler');
jest.mock('repositories/newsletter.repository');

describe('GET /v1/newsletter/:id', () => {
  describe('newsletter exists', () => {
    it('returns the newsletter', async () => {
      const newsletter = newsletterFactory;
      findNewsletter.mockResolvedValue(newsletter);

      const response = await GET({}, { params: { id: newsletter.id } });
      const responseBody = await response.json();

      expect(findNewsletter).toHaveBeenCalledWith(newsletter.id);
      expect(response.status).toBe(StatusCodes.OK);
      expect(responseBody.record).toMatchObject({
        id: newsletter.id,
        name: expect.any(String),
        content: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe('newsletter does NOT exist', () => {
    it('returns error', async () => {
      findNewsletter.mockResolvedValue(null);

      const response = await GET({}, { params: { id: '1' } });
      const responseBody = await response.json();

      expect(findNewsletter).toHaveBeenCalledWith('1');
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(responseBody).toMatchObject({
        message: 'Newsletter could not be viewed',
      });
    });
  });
});
