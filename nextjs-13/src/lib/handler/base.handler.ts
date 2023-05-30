import { User } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { findUserById } from 'repositories/user.repository';

export default async function baseHandler(
  req: NextRequest,
  callback: (currentUser: User) => Promise<NextResponse>
) {
  try {
    const token = await getToken({ req });

    if (token && token.userId) {
      const currentUser = await findUserById(token.userId as string);

      if (currentUser) {
        return callback(currentUser);
      }
    }

    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
