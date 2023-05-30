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
    throw new Response('You must be authenticated to access this page', {
      status: 401,
    });
  }

  return profile._json;
}
