import { User } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

import baseHandler from 'lib/handler/base.handler';

export type ApiMeResponse = { user: User };

export async function GET(req: NextRequest) {
  return baseHandler(req, async (currentUser) => {
    return NextResponse.json({ user: currentUser }, { status: 200 });
  });
}
