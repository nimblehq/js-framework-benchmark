import { User } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import Header from '../components/Header';
import { middleware } from '../middleware';
import UserRepository from '../repositories/user.server';

export async function loader({ request }: LoaderArgs) {
  const session = await middleware(request);
  const user: User = await UserRepository.findBy({
    email: session.email,
  });

  return { user };
}

export default function Index() {
  const { user } = useLoaderData();
  return (
    <>
      <Header />
      <main className="container m-auto py-6 overflow-y-auto overflow-x-hidden">
        <Outlet context={[user]} />
      </main>
    </>
  );
}
