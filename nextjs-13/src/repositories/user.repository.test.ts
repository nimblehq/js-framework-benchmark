import { dbClientMock } from '@test/database';
import { userFactory } from '@test/factories/user.factory';

import { findUserById, findUserByEmail, createUser } from './user.repository';

describe('User Respository', () => {
  describe('findUserById', () => {
    describe('given there is a matching user', () => {
      it('returns a user', async () => {
        const userAttributes = {
          id: '1',
        };
        const user = { ...userFactory, ...userAttributes };

        dbClientMock.user.findUnique.mockResolvedValue(user);

        await expect(findUserById('1')).resolves.toEqual(user);
      });
    });

    describe('given there is NO matching user', () => {
      it('returns null', async () => {
        dbClientMock.user.findUnique.mockResolvedValue(null);

        await expect(findUserById('1')).resolves.toBeNull();
      });
    });
  });

  describe('findUserByEmail', () => {
    describe('given there is a matching user', () => {
      it('returns a user', async () => {
        const userAttributes = {
          email: 'dev@nimblehq.co',
        };
        const user = { ...userFactory, ...userAttributes };

        dbClientMock.user.findUnique.mockResolvedValue(user);

        await expect(findUserByEmail('dev@nimblehq.co')).resolves.toEqual(user);
      });
    });

    describe('given there is NO matching user', () => {
      it('returns null', async () => {
        dbClientMock.user.findUnique.mockResolvedValue(null);

        await expect(findUserByEmail('dev@nimblehq.co')).resolves.toBeNull();
      });
    });
  });

  describe('createUser', () => {
    it('creates a user', async () => {
      const userAttributes = {
        email: 'dev@nimblehq.co',
        name: 'Bear Stern',
        avatarUrl: 'https://loremflickr.com/640/480/abstract',
      };
      const user = { ...userFactory, ...userAttributes };

      dbClientMock.user.create.mockResolvedValue(user);

      await expect(createUser(userAttributes)).resolves.toEqual(user);
    });
  });
});
