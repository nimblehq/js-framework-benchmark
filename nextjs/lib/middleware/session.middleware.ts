import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { getIronSession } from 'iron-session';

import { sessionOptions } from '../../config/session'

export const sessionMiddleware: Middleware<NextApiRequest,NextApiResponse> = async (req, res, next) => {
  const session = await getIronSession(req, res, sessionOptions)

  const { user } = session
  
  console.log('custom sessionMiddleware', user)

  next();
}
