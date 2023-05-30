/**
 * @jest-environment node
 */

import { createCookieSessionStorage } from '@remix-run/node';
import { Authenticator } from 'remix-auth';

describe('middleware', () => {
  const sessionStorage = createCookieSessionStorage({
    cookie: { secrets: ['s3cr3t'] },
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns the user on the session', async () => {
    const user = { id: '123' };
    const session = await sessionStorage.getSession();
    session.set('user', user);

    const request = new Request('http:localhost:3400/', {
      headers: { Cookie: await sessionStorage.commitSession(session) },
    });

    expect(
      new Authenticator(sessionStorage, {
        sessionKey: 'user',
      }).isAuthenticated(request)
    ).resolves.toEqual(user);
  });
});
