"use client"
import Head from 'next/head';
import { signIn } from "next-auth/react"

const AuthSignInPage = () => {
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
