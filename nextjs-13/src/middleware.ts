import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const middleware = async (req) => {
  const user = await getToken({ req });
  const url = req.nextUrl.pathname;

  if (user && url.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (user === null && !url.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
};

export default middleware;
