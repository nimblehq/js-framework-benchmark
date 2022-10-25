import http from 'http';

import { serialize, CookieSerializeOptions } from 'cookie';
import createStore from 'iron-store';
import type { NextApiHandler } from 'next';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import { apiResolver } from 'next/dist/server/api-utils/node';

import { sessionOptions } from '../src/config/session';
import { SerializedUser } from '../src/models/user.model';

function parseQuery(url: string): NextApiRequestQuery {
  const params = new URL(url, 'http://dummy.app').searchParams;
  const query: NextApiRequestQuery = {};

  // @ts-expect-error: 'URLSearchParams' can only be iterated when using the '--downlevelIteration' flag
  for (const [key, value] of params) {
    if (query[key]) {
      const previousValue = query[key];

      query[key] = Array.isArray(previousValue)
        ? [...previousValue, value]
        : [previousValue, value];
    } else {
      query[key] = value;
    }
  }

  return query;
}

export type ApiTestServer = http.Server;

export function createApiServer(handler: NextApiHandler): http.Server {
  const requestHandler: http.RequestListener = async (request, response) => {
    const query = parseQuery(request.url ?? '/');

    return apiResolver(
      request,
      response,
      query,
      handler,
      {
        previewModeEncryptionKey: '',
        previewModeSigningKey: '',
        previewModeId: '',
      },
      true
    );
  };

  return http.createServer(requestHandler);
}

export const COOKIE_REGEX_PATTERN =
  /^next-newsletter=(.+); Max-Age=\d+; Path=\/; HttpOnly; SameSite=Lax$/;

export async function createCookieFor(user: SerializedUser): Promise<string> {
  const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  };
  const store = await createStore({
    password: sessionOptions.password,
  });

  store.set('user', user);

  return serialize(
    sessionOptions.cookieName,
    await store.seal(),
    cookieOptions
  );
}
