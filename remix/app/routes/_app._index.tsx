import { User } from '@prisma/client';
import { useOutletContext } from '@remix-run/react';

import AppLink from '../components/AppLink';

export default function Index() {
  const [user] = useOutletContext() as [User];

  return (
    <>
      <section>
        <div className="flex justify-end">
          <AppLink href="/newsletter/create" name={'Create Newsletter'} />
        </div>
        <h1>JS Framework Benchmark | {user?.name}</h1>
      </section>
    </>
  );
}
