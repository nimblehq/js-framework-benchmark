import { User } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import Layout from '../components/AppLayout';
import { middleware } from '../middleware';
import UserRepository from '../repositories/user.server';

export async function loader({ request }: LoaderArgs) {
  const session = (await middleware(request)) as User;
  const user: User = await UserRepository.findBy({
    email: session.email,
  });

  return { user };
}

export default function Index() {
  const { user } = useLoaderData();
  return (
    <>
      <Layout user={user}>
        <Outlet context={[user]} />
      </Layout>
    </>
  );
}
