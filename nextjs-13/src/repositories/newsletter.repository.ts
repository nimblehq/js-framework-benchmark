import { Prisma } from '@prisma/client';

import dbClient from '../config/database';

const createNewsletter = async (
  newsletterAttributes: Prisma.NewsletterCreateInput
) => dbClient.newsletter.create({ data: newsletterAttributes });

const deleteNewsletter = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => dbClient.newsletter.deleteMany({ where: { id: id, userId: userId } });

const queryNewsletterByUserId = async (id: string) => {
  const user = await dbClient.user.findUnique({
    where: { id: id },
    include: { newsletters: true },
  });

  return user?.newsletters;
};

export { createNewsletter, queryNewsletterByUserId, deleteNewsletter };
