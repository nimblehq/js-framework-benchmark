import { Newsletter, Prisma } from '@prisma/client';

import dbClient from '../config/database.server';

class NewsletterRepository {
  static async create({ data }: Prisma.NewsletterCreateArgs) {
    return (await dbClient.newsletter.create({ data })) as Newsletter;
  }

  static async findMany({ where }: Prisma.NewsletterFindManyArgs) {
    return (await dbClient.newsletter.findMany({
      where,
      orderBy: { createAt: 'desc' },
    })) as Newsletter[];
  }
}

export default NewsletterRepository;
