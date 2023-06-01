import dbClient from '../config/database';
import { Newsletter } from '../models/newsletter.model';

const createNewsletter = async (newsletterAttributes: Newsletter) =>
  dbClient.newsletter.create({ data: newsletterAttributes });

const queryNewsletterByUserId = async (id: string) => {
  const user = await dbClient.user.findUnique({
    where: { id: id },
    include: { newsletters: true },
  });

  return user?.newsletters;
};

export { createNewsletter, queryNewsletterByUserId };
