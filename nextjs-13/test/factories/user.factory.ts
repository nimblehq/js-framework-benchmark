import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const userFactory: User = {
  id: faker.datatype.uuid(),
  name: faker.lorem.word(2),
  email: faker.internet.email(),
  avatarUrl: faker.image.avatar(),
  createdAt: faker.datatype.datetime(),
  updatedAt: faker.datatype.datetime(),
};
