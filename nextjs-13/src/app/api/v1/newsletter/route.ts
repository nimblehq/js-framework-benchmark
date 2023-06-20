import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';

import appHandler from 'lib/handler/app.handler';
import { invalidParamsResponseError } from 'lib/request/error';
import {
  createNewsletter,
  queryNewsletterList,
} from 'repositories/newsletter.repository';

export async function POST(req: NextRequest) {
  return appHandler(req, async (currentUser) => {
    try {
      const { name, content } = await req.json();

      const attributes = {
        name: name,
        content: content,
        user: { connect: { id: currentUser.id } },
      };

      const record = await createNewsletter(attributes);

      return NextResponse.json(
        { newsletter: record },
        { status: StatusCodes.OK }
      );
    } catch (err) {
      return invalidParamsResponseError();
    }
  });
}

export async function GET(req: NextRequest) {
  return appHandler(req, async (currentUser, _) => {
    const records = await queryNewsletterList(currentUser.id);

    return NextResponse.json({ records: records }, { status: StatusCodes.OK });
  });
}
