import { NextApiRequest, NextApiResponse } from 'next'

import withPassport from '../../../lib/auth/withPassport'
import AuthGoogleService from '../../../services/auth/google'

async function signInRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authService = new AuthGoogleService()
    
    authService.authenticate()(req, res, (...args) => {
      console.log('passport authenticated', args)
    })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withPassport(signInRoute)
