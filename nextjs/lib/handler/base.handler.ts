import { ironSession } from 'iron-session/express';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { sessionOptions } from '../../config/session';
import { passportMiddleware } from '../middleware/passport.middleware';
import { sessionMiddleware } from '../middleware/session.middleware';

export const baseHandler = () => {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError: async (error, _request, response) => {
      // Default next-connect behavior
      response.statusCode = 500;
      // eslint-disable-next-line no-console
      console.error(error);
      response.end('Internal Server Error');
    },
  })
    .use(ironSession(sessionOptions))
    .use(sessionMiddleware)
    .use(...passportMiddleware);
};
