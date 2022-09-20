import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import withPassport from '../../../lib/auth/withPassport'
import { sessionOptions } from '../../../lib/http/session'
import AuthGoogleService from '../../../services/auth/google'

async function OauthCoogleRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authService = new AuthGoogleService()

    authService.authenticate()(req, res, async () => {
      const { passport: { user: { avatarUrl, name, email }} } = req.session

      const userInfo = { name: name, avatarUrl: avatarUrl, email: email, isLoggedIn: true }
      req.session.user = userInfo

      await req.session.save()

      res.redirect('/')
    })
    
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(withPassport(OauthCoogleRoute), sessionOptions)