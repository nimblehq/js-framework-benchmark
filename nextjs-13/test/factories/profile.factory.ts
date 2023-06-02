import { faker } from '@faker-js/faker';

export const profileFactory = {
  provider: faker.lorem.word(1),
  id: faker.datatype.uuid(),
  name: faker.lorem.word(2),
  username: faker.lorem.word(1),
  email: faker.internet.email(),
  picture: faker.image.avatar(),
};
