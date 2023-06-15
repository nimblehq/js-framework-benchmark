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

  describe('findFirst', () => {
    it('returns a newsletter', async () => {
      const newsletter = { ...newsletterFactory };

      prismaMock.newsletter.findFirst.mockResolvedValue(newsletter);

      await expect(
        NewsletterRepository.findFirst({ where: { id: newsletter.id } })
      ).resolves.toEqual(newsletter);
    });
  });

  describe('update', () => {
    it('updates a newsletter', async () => {
      const newsletter = { ...newsletterFactory };

      prismaMock.newsletter.updateMany.mockResolvedValue({ count: 1 });

      await expect(
        NewsletterRepository.update({
          where: { id: newsletter.id },
          data: newsletter,
        })
      ).resolves.toEqual({ count: 1 });
    });
  });
});
