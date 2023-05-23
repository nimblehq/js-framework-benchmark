import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["veryscret"],
    secure: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
