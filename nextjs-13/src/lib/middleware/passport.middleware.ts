import passport, { Profile } from 'passport';
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';

import MockStrategy from '@test/mocks/passport';
import { SerializedUser } from '../../models/user.model';
import * as UserRepository from '../../repositories/user.repository';
import AuthError from '../../services/auth/error';
import AuthGoogleService from '../../services/auth/google.service';

declare global {
  namespace Express {
    type User = SerializedUser;
  }
}

const passportStrategyCallback = async (
  _accessToken: string,
  _refreshToken: string,
  userProfile: Profile,
  callback: VerifyCallback
) => {
  callback(null, {});
  try {
    const user = await AuthGoogleService.verifyOrCreateUser(userProfile);
    console.log('========>user : ', user)

    callback(null, user);
  } catch (error) {
    throw new AuthError(error as Error);
  }
};

const getStrategy = (strategyName?: string) => {
  if (strategyName === 'google') {
    return new GoogleStrategy(
      {
        clientID: process.env.OAUTH_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET as string,
        scope: ['profile', 'email'],
        callbackURL: '/api/oauth/google',
      },
      passportStrategyCallback
    );
  }

  return new MockStrategy({}, passportStrategyCallback);
};
passport.use(getStrategy(process.env.OAUTH_PASSPORT_STRATEGY));

passport.serializeUser(({ id }, callback) => {
  callback(null, id);
});

passport.deserializeUser(async (userId: string, callback) => {
  const authenticatedUser = await UserRepository.findUserById(userId);

  callback(null, authenticatedUser);
});

const passportMiddleware = [passport.initialize(), passport.session()];

export { passport, passportMiddleware };
