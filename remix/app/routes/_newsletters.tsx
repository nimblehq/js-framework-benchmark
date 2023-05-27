import type { User } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { authenticator } from '../config/auth.server';
import UserRepository from '../repositories/user.server';
import type { UserProfile } from '../types';

export const loader = async ({ request }: LoaderArgs) => {
  const profile = (await authenticator.isAuthenticated(request)) as {
    _json: UserProfile;
  };

  let user: User | null = null;

  if (!profile?._json) {
    throw new Response('Forbidden', { status: 403 });
  }

  user = await UserRepository.findBy({
    email: profile?._json.email,
  });

  return { user };
};

export default function Index() {
  const { user } = useLoaderData();

  return (
    <section>
      <article>
        <h1>Newsletter Page</h1>
        <p>{user?.name}</p>
      </article>
    </section>
  );
}
