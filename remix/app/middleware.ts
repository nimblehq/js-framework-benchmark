import { redirect } from '@remix-run/node';

import { authenticator } from './config/auth.server';

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const user = await authenticator.isAuthenticated(request);

  if (user && url.pathname.startsWith('/auth')) {
    throw redirect('/');
  }
  if (!user && !url.pathname.startsWith('/auth')) {
    throw redirect('/auth/sign-in');
  }
  return user;
}
