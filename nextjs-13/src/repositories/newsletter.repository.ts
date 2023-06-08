import { Prisma } from '@prisma/client';

import dbClient from '../config/database';

const createNewsletter = async (
  newsletterAttributes: Prisma.NewsletterCreateInput
) => dbClient.newsletter.create({ data: newsletterAttributes });

const deleteNewsletter = async (id: string, userId: string) =>
  dbClient.newsletter.deleteMany({ where: { id: id, userId: userId } });

const updateNewsletter = async (args: Prisma.NewsletterUpdateManyArgs) =>
  dbClient.newsletter.updateMany(args);

const queryNewsletterList = async (userId: string) => {
  return dbClient.newsletter.findMany({
    where: { userId: userId },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const findNewsletter = async (id: string) =>
  dbClient.newsletter.findUnique({ where: { id: id } });

export {
  createNewsletter,
  queryNewsletterList,
  findNewsletter,
  deleteNewsletter,
  updateNewsletter,
};
