import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import AuthGoogleService from "services/auth/google.service";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }: any) {
      return await AuthGoogleService.verifyOrCreateUser(profile);
    }
  }
}

export default NextAuth(authOptions)
