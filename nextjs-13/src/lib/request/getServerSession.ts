import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth';

import { authOptions } from 'config/auth';

// this is a workaround so that we can use `getServerSession` with Next.js Server Actions
// source: https://github.com/nextauthjs/next-auth/issues/7486#issuecomment-1543747325
export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };
  const session = await originalGetServerSession(req, res, authOptions);
  return session;
};
