import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import type { UserProfile } from "~/types";
import { db } from "~/utils/db.server";

export const authenticator = new Authenticator(sessionStorage);

async function handleSocialAuthCallBack({ profile }: any) {
  const userProfile: UserProfile = profile?._json;
  if (userProfile) {
    try {
      await db.user.upsert({
        where: {
          email: userProfile.email,
        },
        update: {
          name: userProfile.name,
          avatarUrl: userProfile.picture,
        },
        create: {
          email: userProfile.email,
          name: userProfile.name,
          avatarUrl: userProfile.picture,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  return profile;
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      scope: ["profile", "email", "openid"],
      callbackURL: `http://localhost:3400/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    handleSocialAuthCallBack
  )
);
