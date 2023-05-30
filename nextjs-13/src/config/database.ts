import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient({
  errorFormat: 'minimal',
  log: ['query'],
});

export default dbClient;
