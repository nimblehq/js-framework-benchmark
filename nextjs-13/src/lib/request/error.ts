import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

import BaseError from '../error';

export default class RequestError extends BaseError {}

export function badRequestResponse(error) {
  return NextResponse.json(
    { message: error },
    { status: StatusCodes.UNPROCESSABLE_ENTITY }
  );
}

export const errorMessageList = {
  [StatusCodes.UNPROCESSABLE_ENTITY]: 'Invalid params',
};

export function invalidParamsResponseError() {
  return badRequestResponse(errorMessageList[StatusCodes.UNPROCESSABLE_ENTITY]);
}
