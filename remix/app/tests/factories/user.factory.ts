import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const userFactory: User = {
  id: faker.string.uuid(),
  name: faker.lorem.word(2),
  email: faker.internet.email(),
  avatarUrl: faker.image.avatar(),
  createdAt: faker.date.anytime(),
};
