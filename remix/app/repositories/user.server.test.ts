import type { User } from '@prisma/client';

import UserRespository from '../repositories/user.server';
import { userFactory } from '../tests/factories/user.factory';
import { prismaMock } from '../tests/setup-test-env';

describe('User Repository', () => {
  describe('updateOrCreate', () => {
    describe('given there is a user information', () => {
      it('creates a user', async () => {
        const user = { ...userFactory };

        prismaMock.user.upsert.mockResolvedValue(user);

        await expect(UserRespository.updateOrCreate(user)).resolves.toEqual(
          user
        );
      });
    });
  });

  describe('findBy', () => {
    describe('given there is a user information', () => {
      it('returns a user', async () => {
        const userAttributes = {
          email: 'phisith@nimblehq.co',
        } as User;

        const user = { ...userFactory, ...userAttributes };

        prismaMock.user.findUnique.mockResolvedValue(user);

        await expect(UserRespository.findBy(userAttributes)).resolves.toEqual(
          user
        );
      });
    });
  });
});
