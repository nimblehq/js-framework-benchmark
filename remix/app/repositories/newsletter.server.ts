import { Newsletter, Prisma } from '@prisma/client';

import dbClient from '../config/database.server';

class NewsletterRepository {
  static async create({ data }: Prisma.NewsletterCreateArgs) {
    return (await dbClient.newsletter.create({ data })) as Newsletter;
  }
}

export default NewsletterRepository;
