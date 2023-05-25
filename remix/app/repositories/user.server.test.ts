import type { User } from '@prisma/client';

import UserRespository from '../repositories/user.server';
import { prismaMock } from '../tests/setup-test-env';

describe('User Repository', () => {
  describe('updateOrCreate', () => {
    describe('given there is a user information', async () => {
      it('creates a user', async () => {
        const user: User = {
          name: 'Beckham',
          email: 'phisith@nimblehq.co',
          avatarUrl: 'weofkwepofkwefokwepfokwpo',
          createdAt: new Date(),
          id: 1,
        };

        prismaMock.user.upsert.mockResolvedValue(user);

        await expect(UserRespository.updateOrCreate(user)).resolves.toEqual(
          user
        );
      });
    });
  });

  describe('findBy', () => {
    describe('given there is a user information', async () => {
      it('returns a user', async () => {
        const user: User = {
          name: 'Beckham',
          email: 'phisith@nimblehq.co',
          avatarUrl: 'weofkwepofkwefokwepfokwpo',
          createdAt: new Date(),
          id: 1,
        };
        const param = {
          email: 'phisith@nimblehq.co',
        } as User;

        prismaMock.user.findUnique.mockResolvedValue(user);

        await expect(UserRespository.findBy(param)).resolves.toEqual(user);
      });
    });
  });
});
