import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

import * as UserRepository from '../../../../repositories/user.repository';
export type ApiMeResponse = { user: User };
import { getToken } from "next-auth/jwt"

export async function GET(req: any) {
  try {
    const token = await getToken({ req })
    console.log('========>token : ', token)

    if (token && token.userId) {
      const currentUser = await UserRepository.findUserById(token.userId as string);

      return NextResponse.json({ user: currentUser }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
