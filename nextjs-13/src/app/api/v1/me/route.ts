import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';

import appHandler from 'lib/handler/app.handler';

export type ApiMeResponse = { user: User };

export async function GET(req: NextRequest) {
  return appHandler(req, async (currentUser) => {
    return NextResponse.json({ user: currentUser }, { status: StatusCodes.OK });
  });
}
