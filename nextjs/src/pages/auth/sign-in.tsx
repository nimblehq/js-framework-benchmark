import type { ReactElement } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import AuthLayout from '../../components/AuthLayout';
import type { AppNextPage } from '../_app';

const AuthSignInPage: AppNextPage = () => {
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

AuthSignInPage.authRequired = false;

AuthSignInPage.setLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthSignInPage;
