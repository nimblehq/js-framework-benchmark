import { Profile as NextAuthProfile } from 'next-auth/core/types';

import { createUser, findUserByEmail } from 'repositories/user.repository';

interface Profile extends NextAuthProfile {
  picture?: string;
  name?: string;
  email?: string;
}

class AuthGoogleService {
  static async verifyOrCreateUser(userProfile: Profile) {
    try {
      const { picture, name, email } = userProfile;

      if (!name || !email) {
        return;
      }

      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        return existingUser;
      }

      const userAttributes = {
        avatarUrl: picture,
        name: name,
        email: email,
      };

      return await createUser(userAttributes);
    } catch (error) {}
  }
}

export default AuthGoogleService;
