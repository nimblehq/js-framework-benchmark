import { NextApiRequest, NextApiResponse } from 'next';

import { baseHandler } from '../../../lib/handler/base.handler';

export default baseHandler().delete(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await req.session.destroy();

    res.redirect('/');
  }
);
