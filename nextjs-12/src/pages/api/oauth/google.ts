import { NextApiRequest, NextApiResponse } from 'next';

import { baseHandler } from '../../../lib/handler/base.handler';
import AuthGoogleService from '../../../services/auth/google.service';

export default baseHandler().get(
  (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authService = new AuthGoogleService();

      authService.authenticate()(req, res, async () => {
        const {
          passport: { user: userId },
        } = req.session;

        req.session.user = { id: userId };
        await req.session.save();

        res.redirect('/');
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);
