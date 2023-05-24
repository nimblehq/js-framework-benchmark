"use client"
import Head from 'next/head';
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';

const AuthSignInPage = () => {
  const { status } = useSession()
  console.log('status')
  console.log(status)

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "authenticated") {
    redirect('/');
  }

  return (
    <>
      <Head>
        <title>Sign in | NextNewsletter 🚀</title>
      </Head>
      <h4>NextNewsletter 🚀</h4>
      <button className="btn" data-testid="loginButton" onClick={() => signIn('google')}>
        Login with Google
      </button>
    </>
  );
};

export default AuthSignInPage;
