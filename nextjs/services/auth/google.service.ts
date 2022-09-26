import { User } from '@prisma/client';
import { Profile, PassportStatic } from 'passport';

import { passport } from '../../lib/middleware/passport.middleware';
import * as UserRepository from '../../repositories/user.repository';
import AuthError from './error';

class AuthGoogleService {
  provider: PassportStatic;

  constructor(provider = passport) {
    this.provider = provider;
  }

  authenticate() {
    try {
      return this.provider.authenticate('google');
    } catch (error) {
      throw new AuthError(error as Error);
    }
  }

  static async verifyOrCreateUser(
    userProfile: Profile
  ): Promise<User | AuthError> {
    try {
      const { photos, displayName, emails } = userProfile;
      const existingUser = await UserRepository.findUserByEmail(
        emails[0].value
      );

      if (existingUser) {
        return Promise.resolve(existingUser);
      }

      const userAttributes = {
        avatarUrl: photos[0].value,
        name: displayName,
        email: emails[0].value,
      };
      const newUser = await UserRepository.createUser(userAttributes);

      return Promise.resolve(newUser);
    } catch (error) {
      return Promise.reject(
        new AuthError({ message: 'User could not be verified or created' })
      );
    }
  }
}

export default AuthGoogleService;
