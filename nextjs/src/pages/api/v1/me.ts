import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { authenticatedHandler } from '../../../lib/handler/authenticated.handler';
import * as UserRepository from '../../../repositories/user.repository';

export type ApiMeResponse = { user: User };

export default authenticatedHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id: userId } = req.session.user;

      const currentUser = await UserRepository.findUserById(userId);

      res.status(200).json({ user: currentUser });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);
