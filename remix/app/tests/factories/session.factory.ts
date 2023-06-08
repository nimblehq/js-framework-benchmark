import { faker } from '@faker-js/faker';

export const sessionFactory = {
  session: `session=${faker.string.uuid}`,
  secrets: faker.lorem.word(5),
};
