import { User } from '@prisma/client';

import RequestError from 'lib/request/error';
import { getServerSession } from 'lib/request/getServerSession';
import { findUserById } from 'repositories/user.repository';

export default async function withAuth(
  callback: (currentUser: User) => unknown
) {
  const session = await getServerSession();

  const currentUser = await findUserById(session?.user?.id as string);
  if (!currentUser) throw new RequestError({ message: 'Invalid token' });

  return callback(currentUser);
}
