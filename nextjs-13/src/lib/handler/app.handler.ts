import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { findUserById } from 'repositories/user.repository';

export default async function appHandler(
  req: NextRequest,
  callback: (currentUser: User, body: unknown) => Promise<NextResponse>
) {
  try {
    const token = await getToken({ req });
    const currentUser = await findUserById(token?.userId as string);

    if (!currentUser)
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: StatusCodes.UNAUTHORIZED }
      );

    return await callback(currentUser, req);
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
