import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { SerializedUser } from '../../models/user.model'
import * as UserRepository from '../../repositories/user.repository'

declare global {
  namespace Express {
    interface User extends SerializedUser {}
  }
}

passport.serializeUser(({ id }, callback) => {
  callback(null, id);
})

passport.deserializeUser(
  async (userId: string, callback) => {
    const authenticatedUser = await UserRepository.findUserById(userId)

    callback(null, authenticatedUser);
  }
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET as string,
      scope: ['profile', 'email'],
      callbackURL: '/api/oauth/google', 
    },
    async (_accessToken, _refreshToken, userProfile, callback: any) => {
      try {
        const { photos, displayName, emails } = userProfile
        const existingUser = await UserRepository.findUserByEmail(emails[0].value)
        
        if (existingUser) {
          return callback(null, existingUser);
        } 

        const userAttributes = { avatarUrl: photos[0].value, name: displayName, email: emails[0].value }
        const newUser = await UserRepository.createUser(userAttributes)

        return callback(null, newUser);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  )
)

const passportMiddleware = [passport.initialize(), passport.session()];

export { passport, passportMiddleware }
