import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";

import { sessionOptions } from './lib/http/session'

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions)

  // do anything with session here:
  const { user } = session;

  return res;
}
