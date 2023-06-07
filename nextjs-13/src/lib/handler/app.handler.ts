import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';
import { getToken, getServerSession } from 'next-auth/jwt';

import { findUserById } from 'repositories/user.repository';

export default async function appHandler(
  req: NextRequest,
  callback: (currentUser: User, body: unknown) => Promise<NextResponse>
) {
  console.log('========>111 : ', 111)
  try {
    console.log('========>1 : ', req)
    const a = await getServerSession()
    console.log('========>a : ', a)
    console.log('========>2 : ', 2)

    const token = await getToken({ req });
    console.log('========>3 : ', token)
    console.log('========>token?.userId : ', token?.userId)
    await findUserById(token?.userId as string);
    console.log('========>5 : ', 6)
    console.log('========>222 : ', 222)

    if (!currentUser)
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: StatusCodes.UNAUTHORIZED }
      );
      console.log('========>333 : ', 333)

    return await callback(currentUser, req);
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
