import { User } from '@prisma/client';
import { useOutletContext } from '@remix-run/react';

export default function Index() {
  const [user] = useOutletContext() as [User];
  return (
    <>
      <h1>JS Framework Benchmark | {user?.name}</h1>
    </>
  );
}
