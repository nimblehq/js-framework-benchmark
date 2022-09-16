import type { IronSessionOptions } from 'iron-session'

import type { User } from '../../models/user'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'next-newsletter',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

// Specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}
