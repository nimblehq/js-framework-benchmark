import dbClient from '../config/database';
import { Newsletter } from '../models/newsletter.model';

const createNewsletter = async (newsletterAttributes: Newsletter) =>
  dbClient.newsletter.create({ data: newsletterAttributes });

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
