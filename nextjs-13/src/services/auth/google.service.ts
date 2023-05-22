import { User } from '@prisma/client';
import { Profile, PassportStatic } from 'passport';

import { passport } from '../../lib/middleware/passport.middleware';
import * as UserRepository from '../../repositories/user.repository';
import AuthError from './error'

class AuthGoogleService {
  provider: PassportStatic;
  strategy: string;

  constructor(
    provider = passport,
    strategy: string = process.env.OAUTH_PASSPORT_STRATEGY || 'mock'
  ) {
    this.provider = provider;
    this.strategy = strategy;
  }

  authenticate() {
    return this.provider.authenticate(this.strategy);
  }

  static async verifyOrCreateUser(
    userProfile: Profile
  ): Promise<User | AuthError> {
    try {
      const { photos, displayName, emails } = userProfile;

      if (emails === undefined) {
        return Promise.reject(
          new AuthError({ message: 'No valid email was provided' })
        );
      }

      const existingUser = await UserRepository.findUserByEmail(
        emails[0].value
      );

      if (existingUser) {
        return Promise.resolve(existingUser);
      }

      const userAttributes = {
        avatarUrl: photos ? photos[0].value : '',
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
