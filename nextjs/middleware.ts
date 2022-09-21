import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session/edge'

import { sessionOptions } from './config/session'

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions)
  const { user } = session;

  console.log('nextjs middleware', user)

  return res;
}
