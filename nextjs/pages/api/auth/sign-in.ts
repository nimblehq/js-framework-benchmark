import { NextApiRequest, NextApiResponse } from 'next'

import { AuthGoogleService } from '../../../services/auth/google'

async function signInRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    AuthGoogleService.authenticate()
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default signInRoute
