import Head from 'next/head';
import Link from 'next/link';

const AuthSignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign in | NextNewsletter 🚀</title>
      </Head>
      <h4>NextNewsletter 🚀</h4>
      <Link href="../api/auth/sign-in">
        <button className="btn" data-testid="loginButton">
          Login with Google
        </button>
      </Link>
    </>
  );
};

export default AuthSignInPage;
