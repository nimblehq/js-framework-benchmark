import Head from 'next/head';
import Link from 'next/link';

const AuthSignInPage = () => {
  return (
    <>
      <Head>
        <title>NextNewsletter 🚀</title>
      </Head>
      <h4>NextNewsletter 🚀</h4>
      <Link href="../auth/sign-in">
        <button className="btn" data-testid="loginButton">
          Go to Sign In page
        </button>
      </Link>
    </>
  );
};

export default AuthSignInPage;
