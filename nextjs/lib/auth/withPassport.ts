import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

passport.serializeUser((user, callback: any) => {
  const { photos, displayName, emails } = user

  callback(null, { avatarUrl: photos[0].value, name: displayName, email: emails[0].value });
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

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

export { passport }

export default handler => (req, res) => {
  // Nesting of middleware handlers does what app.use(passport.initialize()) does in Express
  passport.initialize()(req, res, () =>
    passport.session()(req, res, () => {
      // Call wrapped API route as innermost handler
      handler(req, res)
    })
  )
}
