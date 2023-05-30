import { User } from '@prisma/client';
import baseHandler from 'lib/handler/base.handler';
import { NextResponse, NextRequest } from 'next/server';

export type ApiMeResponse = { user: User };

export async function GET(req: NextRequest) {
  return baseHandler(req, async (currentUser) => {
    return NextResponse.json({ user: currentUser }, { status: 200 });
  })
}
