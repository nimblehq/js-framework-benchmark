import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';

import appHandler from 'lib/handler/app.handler';
import { deleteNewsletter } from 'repositories/newsletter.repository';

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
      return NextResponse.json(
        { message: 'Invalid params' },
        { status: StatusCodes.UNPROCESSABLE_ENTITY }
      );
    }
  });
}
