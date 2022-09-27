import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const AuthSignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in | NextNewsletter 🚀</title>
      </Head>

      <Link href="../api/auth/sign-in">
        <button className="btn">Login</button>
      </Link>
    </>
  );
};

export default AuthSignInPage;
