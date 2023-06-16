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

  static async findOne({ where }: Prisma.NewsletterFindFirstArgs) {
    return (await dbClient.newsletter.findFirst({ where })) as Newsletter;
  }

  static async update(args: Prisma.NewsletterUpdateManyArgs) {
    return dbClient.newsletter.updateMany(args);
  }
}

export default NewsletterRepository;
