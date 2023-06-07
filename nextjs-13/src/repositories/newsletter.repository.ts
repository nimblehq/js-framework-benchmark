import { Prisma } from '@prisma/client';

import dbClient from '../config/database';

const createNewsletter = async (
  newsletterAttributes: Prisma.NewsletterCreateInput
) => dbClient.newsletter.create({ data: newsletterAttributes });

const deleteNewsletter = async (id: string, userId: string) =>
  dbClient.newsletter.deleteMany({ where: { id: id, userId: userId } });

const updateNewsletter = async (args: Prisma.NewsletterUpdateManyArgs) =>
  dbClient.newsletter.updateMany(args);

const queryNewsletters = async (userId: string, ids = []) => {
  const where =
    ids.length === 0 ? { userId: userId } : { userId: userId, id: { in: ids } };

  return dbClient.newsletter.findMany({
    where: where,
    orderBy: {
      createdAt: 'asc',
    },
  });
};

export {
  createNewsletter,
  queryNewsletters,
  deleteNewsletter,
  updateNewsletter,
};
