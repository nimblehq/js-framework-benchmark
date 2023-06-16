/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createCookieSessionStorage } from '@remix-run/node';
import { Authenticator } from 'remix-auth';

import { action } from './auth.sign-out';
import { sessionFactory } from '../tests/factories/session.factory';
import { makeRequest } from '../tests/helpers/request';

jest.mock('./auth.sign-out', () => ({
  action: jest.fn(),
}));

describe('Auth sign-out', () => {
  const sessionMock = { ...sessionFactory };

  const sessionStorage = createCookieSessionStorage({
    cookie: { secrets: sessionMock.secrets },
  });

  (action as jest.Mock).mockReturnValue({
    headers: {
      location: '/auth/sign-in',
      'Set-Cookie': sessionMock.session,
    },
  });

  describe('POST /auth/sign-out', () => {
    it('returns to /auth/sign-in', async () => {
      const request = makeRequest({ url: '/auth/sign-out', method: 'post' });

      const result: any = await action({
        request,
        params: {},
        context: {},
      });

      const location = result.headers.location;

      expect(location).toEqual('/auth/sign-in');
    });
  });

  describe('given a session', () => {
    it('destroys the session', async () => {
      const user = { id: '123' };
      const session = await sessionStorage.getSession();

      session.set('user', user);

      const request = makeRequest({
        url: '/auth/sign',
        method: 'post',
        headers: {
          Cookie: await sessionStorage.commitSession(session),
        },
      });

      new Authenticator(sessionStorage, {
        sessionKey: 'user',
      }).isAuthenticated(request);

      const result: any = await action({
        request,
        params: {},
        context: {},
      });

      const cookie = result.headers['Set-Cookie'];
      const sessionInCookie = await sessionStorage.getSession(cookie);

      expect(sessionInCookie.get('user')).toBeUndefined();
    });
  });
});
