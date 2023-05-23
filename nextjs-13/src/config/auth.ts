import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { createUser, findUserByEmail } from "repositories/user.repository";

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
      try {
        const { picture, name, email } = profile;

        if (email === undefined) {
          return false
        }

        const existingUser = await findUserByEmail(
          email
        );

        if (existingUser) {
          return true
        }

        const userAttributes = {
          avatarUrl: picture,
          name: name,
          email: email,
        };

        await createUser(userAttributes);

        return true
      } catch (error) {
        return false
      }
    }
  }
}

export default NextAuth(authOptions)