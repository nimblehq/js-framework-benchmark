import { Prisma } from '@prisma/client';

import dbClient from '../config/database';

const createNewsletter = async (
  newsletterAttributes: Prisma.NewsletterCreateInput
) => dbClient.newsletter.create({ data: newsletterAttributes });

const deleteNewsletter = async (id: string, userId: string) =>
  dbClient.newsletter.deleteMany({ where: { id: id, userId: userId } });

const updateNewsletter = async (args: Prisma.NewsletterUpdateManyArgs) =>
  dbClient.newsletter.updateMany(args);

const queryNewsletterList = async (userId: string, newsletterIds = []) => {
  const where = !newsletterIds.length
    ? { userId: userId }
    : { userId: userId, id: { in: newsletterIds } };

  return dbClient.newsletter.findMany({
    where: where,
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const countNewsletters = async (userId: string, newsletterIds = []) => {
  return dbClient.newsletter.count({
    where: { userId: userId, id: { in: newsletterIds } },
  });
};

export {
  createNewsletter,
  queryNewsletterList,
  deleteNewsletter,
  updateNewsletter,
  countNewsletters,
};
