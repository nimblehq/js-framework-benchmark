import type { IronSessionOptions } from 'iron-session';

import type { SerializedUser } from '../models/user.model';

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_SECRET as string,
  cookieName: 'next-newsletter',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// Specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: SerializedUser;
  }
}
