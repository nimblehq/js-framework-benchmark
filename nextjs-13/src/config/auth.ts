import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AuthGoogleService from "services/auth/google.service";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile, account }) {
      if(!profile) return false

      const user = await AuthGoogleService.verifyOrCreateUser(profile);

      if (user && account) {
        account.id = user.id
      }

      return !!user
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, account }) {
      if (account) {
        token.userId = account.id
      }
      return Promise.resolve(token);
    }
  }
}

export default NextAuth(authOptions)
