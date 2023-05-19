import { getIronSession } from 'iron-session/edge';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { sessionOptions } from './config/session';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
  const { user } = session;

  if (user && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (user === undefined && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return res;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - auth (Authentication routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next|static|favicon.ico).*)',
  ],
};
