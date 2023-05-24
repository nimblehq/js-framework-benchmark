import type { UserProfile } from "~/types";
import { db } from "~/config/db.server";

export async function handleSocialAuthCallBack({ profile }: any) {
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
