import { faker } from '@faker-js/faker';
import { Newsletter } from '@prisma/client';

export const newsletterFactory: Newsletter = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word(2),
  content: faker.lorem.paragraph(),
  userId: faker.datatype.uuid(),
  createdAt: faker.datatype.datetime(),
  updatedAt: faker.datatype.datetime(),
};
