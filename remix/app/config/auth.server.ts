import { sessionStorage } from "~/config/session.server";
import { handleSocialAuthCallBack } from "~/services/auth.server";

import { Authenticator } from "remix-auth";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

export const authenticator = new Authenticator(sessionStorage);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

if (!GOOGLE_CLIENT_ID) {
  throw new Error("Need Google Client ID");
}
if (!GOOGLE_CLIENT_SECRET) {
  throw new Error("Need Google Client Secret");
}

try {
  authenticator.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        scope: ["profile", "email", "openid"],
        callbackURL: `http://localhost:3400/auth/${SocialsProvider.GOOGLE}/callback`,
      },
      handleSocialAuthCallBack
    )
  );
} catch (err) {
  throw err;
}
