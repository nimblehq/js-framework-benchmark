import type { User } from '@prisma/client';

import dbClient from '../config/database.server';
import type { UserProfile } from '../types';

class UserRepository {
  static async findBy(param: UserProfile): Promise<User> {
    return (await dbClient.user.findUnique({
      where: param,
    })) as User;
  }

  static async updateOrCreate(data: UserProfile) {
    return (await dbClient.user.upsert({
      where: {
        email: data.email,
      },
      update: {
        name: data.name,
        avatarUrl: data.picture,
      },
      create: {
        email: data.email,
        name: data.name as string,
        avatarUrl: data.picture,
      },
    })) as User;
  }
}

export default UserRepository;
