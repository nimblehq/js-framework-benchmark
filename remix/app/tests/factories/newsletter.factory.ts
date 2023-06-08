import { faker } from '@faker-js/faker';
import { Newsletter } from '@prisma/client';

export const newsletterFactory: Newsletter = {
  id: faker.string.uuid(),
  name: faker.lorem.word(2),
  content: faker.lorem.paragraph(),
  userId: faker.string.uuid(),
  createAt: faker.date.anytime(),
  updateAt: faker.date.anytime(),
};
