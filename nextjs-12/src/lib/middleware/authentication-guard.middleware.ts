import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';

export const authenticationGuardMiddleware: Middleware<
  NextApiRequest,
  NextApiResponse
> = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    res
      .status(401)
      .json({ message: 'This action requires to be authenticated' });

    return res.end();
  }

  next();
};
