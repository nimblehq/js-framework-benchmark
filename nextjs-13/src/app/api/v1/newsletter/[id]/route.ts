import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';

import { invalidParamsResponseError } from 'lib/request/error';
import { findNewsletter } from 'repositories/newsletter.repository';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const record = await findNewsletter(params.id);

    if (!record)
      return NextResponse.json(
        { message: 'Newsletter could not be viewed' },
        { status: StatusCodes.UNPROCESSABLE_ENTITY }
      );

    return NextResponse.json({ record }, { status: StatusCodes.OK });
  } catch (err) {
    return invalidParamsResponseError();
  }
}
