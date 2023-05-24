import { createUser, findUserByEmail } from "repositories/user.repository";
import { Profile as NextAuthProfile } from 'next-auth/core/types'

interface Profile extends NextAuthProfile {
  picture?: string;
  name?: string;
  email?: string;
}

class AuthGoogleService {
  static async verifyOrCreateUser(
    userProfile: Profile
  ) {
    try {
      const { picture, name, email } = userProfile;

      if (!name || !email) {
        return
      }

      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        return existingUser
      }

      const userAttributes = {
        avatarUrl: picture,
        name: name,
        email: email,
      };

      return await createUser(userAttributes);
    } catch (error) {
      return
    }
  }
}

export default AuthGoogleService;
