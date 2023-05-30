'use client';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/sign-in');
  }

  return (
    <>
      <Head>
        <title>Welcome to NextNewsletter 🚀</title>
      </Head>
      <h4>Welcome to NextNewsletter 🚀</h4>
    </>
  );
};

export default Home;
