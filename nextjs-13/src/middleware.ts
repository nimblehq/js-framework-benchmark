import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const isPublicPath = (url: string) => {
  return url.startsWith('/newsletter') || url.startsWith('/auth');
};

const middleware = async (req) => {
  const user = await getToken({ req });
  const url = req.nextUrl.pathname;

  if (user && url.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!user && !isPublicPath(url)) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
};

export default middleware;
