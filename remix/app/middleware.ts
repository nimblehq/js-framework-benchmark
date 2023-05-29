import { redirect } from '@remix-run/node';

import { authenticator } from './config/auth.server';
import { UserProfile } from './types';

export async function middleware(request: Request) {
  const profile = (await authenticator.isAuthenticated(request)) as {
    _json: UserProfile;
  };

  if (!profile) {
    throw redirect('/auth/sign-in');
  }
  return profile?._json;
}
