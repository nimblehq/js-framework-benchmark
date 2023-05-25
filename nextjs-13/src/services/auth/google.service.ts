import { createUser, findUserByEmail } from "repositories/user.repository";

interface Profile {
  picture: string;
  name: string;
  email: string;
}

class AuthGoogleService {
  static async verifyOrCreateUser(
    userProfile: Profile
  ) {
    try {
      const { picture, name, email } = userProfile;

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

export default AuthGoogleService;
