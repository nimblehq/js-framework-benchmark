import { NextApiRequest, NextApiResponse } from 'next'

import { baseHandler } from '../../../lib/handler/base.handler';
import AuthGoogleService from '../../../services/auth/google'

export default baseHandler().get((req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authService = new AuthGoogleService()

    authService.authenticate()(req, res, async () => {
      const { passport: { user: { avatarUrl, name, email }} } = req.session

      const userInfo = { name: name, avatarUrl: avatarUrl, email: email }
      req.session.user = userInfo

      await req.session.save()

      res.redirect('/')
    })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})
