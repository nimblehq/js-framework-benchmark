import { NextApiRequest, NextApiResponse } from 'next';

import { baseHandler } from '../../../lib/handler/base.handler';
import AuthGoogleService from '../../../services/auth/google.service';

export default baseHandler().get(
  (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authService = new AuthGoogleService();

      authService.authenticate()(req, res);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);
