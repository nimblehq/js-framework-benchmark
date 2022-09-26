import { dbClient } from '../config/database';
import { User } from '../models/user.model';

const findUserById = async (id: string) =>
  dbClient.user.findUnique({ where: { id: id } });

const findUserByEmail = async (email: string) =>
  dbClient.user.findUnique({ where: { email: email } });

const createUser = async (userAttributes: User) =>
  dbClient.user.create({ data: userAttributes });

export { findUserById, findUserByEmail, createUser };
