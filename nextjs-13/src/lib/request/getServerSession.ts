import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth';

import { authOptions } from 'config/auth';

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };
  const session = await originalGetServerSession(req, res, authOptions);
  return session;
};
