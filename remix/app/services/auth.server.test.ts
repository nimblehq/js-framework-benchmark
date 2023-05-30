import { handleSocialAuthCallBack, Profile } from './auth.server';
import { userFactory } from '../tests/factories/user.factory';

describe('handleSocialAuthCallBack', () => {
  describe('givens is a user login request', () => {
    it('returns the user', async () => {
      const user = { ...userFactory };
      const request: Profile = { profile: { _json: { ...user } } };

      await expect(handleSocialAuthCallBack(request)).resolves.toEqual(user);
    });
  });

  describe('givens without a user login request', () => {
    it('throw error', async () => {
      const request = {} as Profile;

      await expect(handleSocialAuthCallBack(request)).rejects.toThrowError();
    });
  });
});
