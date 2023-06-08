import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';

import appHandler from 'lib/handler/app.handler';
import { invalidParamsResponseError } from 'lib/request/error';
import {
  deleteNewsletter,
  findNewsletter,
  updateNewsletter,
} from 'repositories/newsletter.repository';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return appHandler(req, async (currentUser) => {
    try {
      const result = await deleteNewsletter(params.id, currentUser.id);

      if (result.count === 0) {
        return NextResponse.json(
          { message: 'Newsletter could not be deleted' },
          { status: StatusCodes.UNPROCESSABLE_ENTITY }
        );
      }

      return NextResponse.json(
        { status: 'success' },
        { status: StatusCodes.OK }
      );
    } catch (err) {
      return invalidParamsResponseError();
    }
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return appHandler(req, async (currentUser) => {
    try {
      const { name, content } = await req.json();

      const data = { name, content };

      const where = {
        id: params.id,
        user: currentUser,
      };

      const result = await updateNewsletter({
        where,
        data,
      });

      if (!result.count) {
        return NextResponse.json(
          { message: 'Newsletter could not be updated' },
          { status: StatusCodes.UNPROCESSABLE_ENTITY }
        );
      }

      return NextResponse.json(
        { status: 'success' },
        { status: StatusCodes.OK }
      );
    } catch (err) {
      return invalidParamsResponseError();
    }
  });
}

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const record = await findNewsletter(params.id);

    if (!record)
      return NextResponse.json(
        { message: 'Newsletter not exists' },
        { status: StatusCodes.UNPROCESSABLE_ENTITY }
      );

    return NextResponse.json({ record }, { status: StatusCodes.OK });
  } catch (err) {
    return getInvalidParamsError();
  }
}
