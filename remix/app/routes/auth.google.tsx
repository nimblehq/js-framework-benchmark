import type { ActionArgs } from '@remix-run/node';
import { SocialsProvider } from 'remix-auth-socials';

import { authenticator } from '../config/auth.server';

export const action = async ({ request }: ActionArgs) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: '/',
    failureRedirect: '/auth/sign-in',
  });
};
