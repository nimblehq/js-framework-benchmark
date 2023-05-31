import { User } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { findUserById } from 'repositories/user.repository';

export default async function baseHandler(
  req: NextRequest,
  callback: (
    currentUser: User,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any
  ) => Promise<NextResponse>
) {
  try {
    const token = await getToken({ req });

    if (token && token.userId) {
      const currentUser = await findUserById(token.userId as string);

      if (currentUser) {
        let body = {};

        try {
          body = await req.json();
        } catch (err) {}

        console.log('========>body : ', body);
        return await callback(currentUser, body);
      }
    }

    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  } catch (err) {
    console.log('========>err : ', err);
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 500 }
    );
  }
}
