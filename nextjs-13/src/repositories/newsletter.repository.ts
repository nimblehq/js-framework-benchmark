import { Prisma } from '@prisma/client';

import dbClient from '../config/database';

const createNewsletter = async (
  newsletterAttributes: Prisma.NewsletterCreateInput
) => dbClient.newsletter.create({ data: newsletterAttributes });

const deleteNewsletter = async (id: string, userId: string) =>
  dbClient.newsletter.deleteMany({ where: { id: id, userId: userId } });

const updateNewsletter = async (args: Prisma.NewsletterUpdateManyArgs) =>
  dbClient.newsletter.updateMany(args);

const queryNewsletterByUserId = async (id: string) =>
  dbClient.newsletter.findMany({
    where: { userId: id },
    orderBy: {
      createdAt: 'asc',
    },
  });

export {
  createNewsletter,
  queryNewsletterByUserId,
  deleteNewsletter,
  updateNewsletter,
};
