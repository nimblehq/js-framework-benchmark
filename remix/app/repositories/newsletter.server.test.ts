import NewsletterRepository from './newsletter.server';
import { prismaMock } from '../tests/database';
import { newsletterFactory } from '../tests/factories/newsletter.factory';

describe('Newsletter Repository', () => {
  describe('create', () => {
    it('creates a newsletter', async () => {
      const newsletter = { ...newsletterFactory };

      prismaMock.newsletter.create.mockResolvedValue(newsletter);

      await expect(
        NewsletterRepository.create({ data: newsletter })
      ).resolves.toEqual(newsletter);
    });
  });
});
