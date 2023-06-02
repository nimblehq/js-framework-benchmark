import { Prisma } from '@prisma/client';

import dbClient from '../config/database';

const findUserById = async (id: string) =>
  dbClient.user.findUnique({ where: { id: id } });

const findUserByEmail = async (email: string) =>
  dbClient.user.findUnique({ where: { email: email } });

const createUser = async (userAttributes: Prisma.UserCreateInput) =>
  dbClient.user.create({ data: userAttributes });

export { findUserById, findUserByEmail, createUser };
