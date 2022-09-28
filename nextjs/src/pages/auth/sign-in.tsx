import Head from 'next/head';
import Link from 'next/link';

const AuthSignInPage = () => {
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

export default AuthSignInPage;
