import type { UserProfile } from "~/types";
import UserRespository from "~/repositories/user.server";

export async function handleSocialAuthCallBack({ profile }: any) {
  const userProfile: UserProfile = profile?._json;

  if (userProfile) {
    await UserRespository.updateOrCreate(userProfile)
  }
  return profile;
}
