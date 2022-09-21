import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { SerializedUser as UserModel } from '../../models/user.model'

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

passport.serializeUser<UserModel>((user, callback) => {
  const { photos, displayName, emails } = user

  callback(null, { avatarUrl: photos[0].value, name: displayName, email: emails[0].value });
});

passport.deserializeUser<UserModel>(
  async (user, callback) => {
    callback(null, user);
  }
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET as string,
      scope: ['profile', 'email'],
      callbackURL: '/api/oauth/google', 
    },
    (_accessToken, _refreshToken, user, callback: any) => {
      try {
        callback(null, user);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  )
)

const passportMiddleware = [passport.initialize(), passport.session()];

export { passport, passportMiddleware }
