import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '../../../lib/http/session'
import type { User } from '../../../models/user'
import { AuthGoogleService } from '../../../services/auth/google'

async function Oauth2CoogleRoute(req: NextApiRequest, res: NextApiResponse) {

  try {
    const user: User = await AuthGoogleService.authenticate()

    const userInfo = { name: user.name, avatarUrl: user.avatarUrl, email: user.email, isLoggedin: true }
    req.session.user = userInfo
    await req.session.save()
    
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(Oauth2CoogleRoute, sessionOptions)