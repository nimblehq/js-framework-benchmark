import { authenticator } from '../../config/auth.server';
import { UserProfile } from '../../types';

export async function requireUserSession(request: Request) {
  const profile = (await authenticator.isAuthenticated(request)) as {
    _json: UserProfile;
  };

  if (!profile?._json) {
    throw new Response('Forbidden', { status: 403 });
  }
  return profile?._json;
}
