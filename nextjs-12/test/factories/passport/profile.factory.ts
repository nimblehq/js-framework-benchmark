import { faker } from '@faker-js/faker';
import { Profile } from 'passport';

export const passportProfileFactory: Profile = {
  provider: faker.lorem.word(1),
  id: faker.datatype.uuid(),
  displayName: faker.lorem.word(2),
  username: faker.lorem.word(1),
  emails: [{ value: faker.internet.email() }],
  photos: [{ value: faker.image.avatar() }],
};
