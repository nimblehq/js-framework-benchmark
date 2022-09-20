import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import type { User } from '../../models/user'

passport.serializeUser((user: User, callback) => {
  const { avatarUrl, name, email } = user

  callback(null, { avatarUrl: avatarUrl, name: name, email: email });
});

passport.deserializeUser((user: User, callback) => {
  callback(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_SECRET as string,
      scope: ['profile', 'email'],
      callbackURL: '/api/oauth/google', 
    },
    async (_accessToken, _refreshToken, user, callback: any) => {
      try {
        return callback(null, user);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  )
)

export { passport }

export default fn => (req, res) => {
  // Nesting of middleware handlers does what app.use(passport.initialize()) does in Express
  passport.initialize()(req, res, () =>
    passport.session()(req, res, () =>
      // Call wrapped API route as innermost handler
      fn(req, res)
    )
  )
}
