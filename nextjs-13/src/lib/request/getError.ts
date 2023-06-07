import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

function getError(error) {
  return NextResponse.json(
    { message: error },
    { status: StatusCodes.UNPROCESSABLE_ENTITY }
  );
}

export default getError;
