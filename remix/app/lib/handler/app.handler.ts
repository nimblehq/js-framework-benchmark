import { User } from '@prisma/client';
import { Response } from '@remix-run/node';
import { StatusCodes } from 'http-status-codes';

import { authenticator } from '../../config/auth.server';
import UserRepository from '../../repositories/user.server';

export default async function appHandler(
  request: Request,
  callback: (user: User) => Promise<unknown>
) {
  let userInfo: User;

  const userSession = (await authenticator.isAuthenticated(request)) as User;

  if (userSession?.email) {
    userInfo = await UserRepository.findBy({ email: userSession.email });

    return callback(userInfo);
  } else {
    throw new Response('You must be authenticated to access this page', {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
}
