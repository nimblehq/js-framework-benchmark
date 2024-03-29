import { dbClientMock } from '@test/database';
import { profileFactory } from '@test/factories/profile.factory';
import { userFactory } from '@test/factories/user.factory';

import AuthGoogleService from './google.service';

describe('User AuthGoogleService', () => {
  describe('verifyOrCreateUser', () => {
    describe('given there is an existing user', () => {
      it('returns the existing user', async () => {
        const userAttributes = {
          email: 'dev@nimblehq.co',
        };
        const existingUser = { ...userFactory, ...userAttributes };
        const profile = { ...profileFactory, ...userAttributes };

        dbClientMock.user.findUnique.mockResolvedValue(existingUser);

        await expect(
          AuthGoogleService.verifyOrCreateUser(profile)
        ).resolves.toEqual(existingUser);
      });
    });

    describe('given there is NO existing user', () => {
      it('creates and returns a new user', async () => {
        const profileAttributes = {
          email: 'dev@nimblehq.co',
        };
        const profile = { ...profileFactory, ...profileAttributes };
        const newUser = userFactory;

        dbClientMock.user.findUnique.mockResolvedValue(null);
        dbClientMock.user.create.mockResolvedValue(newUser);

        await expect(
          AuthGoogleService.verifyOrCreateUser(profile)
        ).resolves.toEqual(newUser);
      });
    });

    describe('given there is NO existing user and the profile contains NO photos', () => {
      it('creates and returns a new user with an empty avatarUrl', async () => {
        const profileAttributes = {
          picture: '',
        };
        const profile = { ...profileFactory, ...profileAttributes };
        const newUser = { ...userFactory, avatarUrl: '' };

        dbClientMock.user.findUnique.mockResolvedValue(null);
        dbClientMock.user.create.mockResolvedValue(newUser);

        await expect(
          AuthGoogleService.verifyOrCreateUser(profile)
        ).resolves.toEqual(newUser);
      });
    });
  });
});
