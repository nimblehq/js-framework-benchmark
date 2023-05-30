import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import * as UserRepository from '../../../../repositories/user.repository';

export type ApiMeResponse = { user: User };

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (token && token.userId) {
      const currentUser = await UserRepository.findUserById(
        token.userId as string
      );

      return NextResponse.json(
        { user: currentUser },
        { status: StatusCodes.OK }
      );
    }

    return NextResponse.json(
      { message: 'Invalid token' },
      { status: StatusCodes.UNAUTHORIZED }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
