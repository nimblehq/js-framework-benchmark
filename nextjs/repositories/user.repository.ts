import { dbClient } from '../config/database'
import { SerializedUser } from '../models/user.model'

const findUserById = async (id: string) => await dbClient.user.findUnique({where: { id: id }})

const findUserByEmail = async (email: string) => await dbClient.user.findUnique({where: { email: email }})

const createUser = async (userAttributes: SerializedUser)  => await dbClient.user.create({data: userAttributes})

export { 
  findUserById,
  findUserByEmail, 
  createUser,
}
