import type { User } from '@prisma/client';

import dbClient from '../config/database.server';
import type { UserProfile } from '../types';

class UserRespository {
  static async findBy(param: UserProfile): Promise<User> {
    try {
      return (await dbClient.user.findUnique({
        where: param,
      })) as User;
    } catch (err) {
      throw err;
    }
  }

  static async updateOrCreate(data: UserProfile) {
    try {
      return await dbClient.user.upsert({
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
      });
    } catch (err) {
      throw err;
    }
  }
}

export default UserRespository;
