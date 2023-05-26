import { User } from '@prisma/client';

import UserRepository from '../repositories/user.server';
import type { UserProfile } from '../types';

export interface Profile {
  profile: { _json: UserProfile };
}

export async function handleSocialAuthCallBack({ profile }: Profile) {
  const userProfile: UserProfile = profile?._json;

  if (userProfile) {
    await UserRepository.updateOrCreate(userProfile);
  } else {
    throw new Response('This action need authenticated', { status: 401 });
  }

  return profile._json;
}
