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

  describe('findAll', () => {
    it('returns all newsletters', async () => {
      const newsletters = Array(5).fill(newsletterFactory);

      prismaMock.newsletter.findMany.mockResolvedValue(newsletters);

      await expect(NewsletterRepository.findMany({})).resolves.toEqual(
        newsletters
      );
    });
  });

  describe('findOne', () => {
    it('returns a newsletter', async () => {
      const newsletter = { ...newsletterFactory };

      prismaMock.newsletter.findUnique.mockResolvedValue(newsletter);

      await expect(
        NewsletterRepository.findOne({ where: { id: newsletter.id } })
      ).resolves.toEqual(newsletter);
    });
  });

  describe('update', () => {
    it('updates a newsletter', async () => {
      const newsletter = { ...newsletterFactory };

      prismaMock.newsletter.update.mockResolvedValue(newsletter);

      await expect(
        NewsletterRepository.update({
          where: { id: newsletter.id },
          data: newsletter,
        })
      ).resolves.toEqual(newsletter);
    });
  });
});
