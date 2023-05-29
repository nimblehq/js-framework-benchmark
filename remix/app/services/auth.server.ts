import { User } from '@prisma/client';

import UserRepository from '../repositories/user.server';
import type { UserProfile } from '../types';

interface Profile {
  profile: { _json: UserProfile };
}

export async function handleSocialAuthCallBack({ profile }: Profile) {
  const userProfile: UserProfile = profile?._json;

  if (userProfile) {
    await UserRepository.updateOrCreate(profile?._json as User);
  }

  return profile;
}
