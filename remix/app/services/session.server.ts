import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: process.env.SESSION_NAME,
    sameSite: process.env.SESSION_SAMESITE,
    path: process.env.SESSION_PATH,
    httpOnly: process.env.SESSION_HTTPONLY ? true : false,
    secrets: process.env.SESSION_SECRETS,
    secure: process.env.SESSION_SECURE ? true : false,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
