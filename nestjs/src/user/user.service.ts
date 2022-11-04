import { Injectable } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';

import { DatabaseService } from '../database.service';

@Injectable()
export class UserService {
  constructor(private dbService: DatabaseService) {}

  async find(
    whereAttribute: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.dbService.user.findUnique({
      where: whereAttribute,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.dbService.user.create({
      data,
    });
  }
}
