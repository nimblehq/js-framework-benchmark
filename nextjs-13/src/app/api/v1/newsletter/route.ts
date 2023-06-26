import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';

import appHandler from 'lib/handler/app.handler';
import { queryNewsletterList } from 'repositories/newsletter.repository';

export async function GET(req: NextRequest) {
  return appHandler(req, async (currentUser, _) => {
    const records = await queryNewsletterList(currentUser.id);

    return NextResponse.json({ records: records }, { status: StatusCodes.OK });
  });
}
