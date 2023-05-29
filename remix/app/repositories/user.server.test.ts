import type { User } from '@prisma/client';

import UserRepository from '../repositories/user.server';
import { userFactory } from '../tests/factories/user.factory';
import { prismaMock } from '../tests/setup-test-env';

describe('User Repository', () => {
  describe('updateOrCreate', () => {
    describe('given there is an existing user', () => {
      it('creates a user', async () => {
        const user = { ...userFactory };

        prismaMock.user.upsert.mockResolvedValue(user);

        await expect(UserRepository.updateOrCreate(user)).resolves.toEqual(
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

        await expect(UserRepository.findBy(userAttributes)).resolves.toEqual(
          user
        );
      });
    });
  });
});
