import type { ActionArgs } from '@remix-run/node';

import { authenticator } from '../config/auth.server';

export const action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: '/auth/sign-in' });
};
