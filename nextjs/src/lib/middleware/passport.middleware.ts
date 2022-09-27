import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { SerializedUser } from '../../models/user.model';
import * as UserRepository from '../../repositories/user.repository';
import AuthError from '../../services/auth/error';
import AuthGoogleService from '../../services/auth/google.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends SerializedUser {}
  }
}

passport.serializeUser(({ id }, callback) => {
  callback(null, id);
});

passport.deserializeUser(async (userId: string, callback) => {
  const authenticatedUser = await UserRepository.findUserById(userId);

  callback(null, authenticatedUser);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET as string,
      scope: ['profile', 'email'],
      callbackURL: '/api/oauth/google',
    },
    async (_accessToken, _refreshToken, userProfile, callback) => {
      try {
        const user = await AuthGoogleService.verifyOrCreateUser(userProfile);

        return callback(null, user);
      } catch (error) {
        throw new AuthError(error as Error);
      }
    }
  )
);

const passportMiddleware = [passport.initialize(), passport.session()];

export { passport, passportMiddleware };
