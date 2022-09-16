import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import type { User } from '../../models/user'

passport.serializeUser((user: User, callback) => {
  process.nextTick(() => {
    callback(null, { name: user.name, avatarUrl: user.avatarUrl, email: user.email });
  });
});

passport.deserializeUser((user: User, callback) => {
  process.nextTick(() => {
    return callback(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ['profile', 'email'],
      // Endpoint registered on Google while creating the application
      callbackURL: '/api/oauth2/google', 
    },
    async (_accessToken, _refreshToken, profile, callback: any) => {
      try {
        return callback(null, profile);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  )
)

const AuthGoogleService = {
  authenticate: () => {
    passport.authenticate('google')
  }
}

export { AuthGoogleService }
