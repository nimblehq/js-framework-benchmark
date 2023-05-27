import { Form } from '@remix-run/react';
import { SocialsProvider } from 'remix-auth-socials';

import googleIcon from '../../public/icons/google.svg';

export default function AuthSignInPage() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <article>
          <h1>Sign in | Remix Newsletter 📀</h1>
          <h4>Remix Newsletter</h4>
        </article>
        <article className="flex justify-center">
          <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
            <button
              type="submit"
              className="flex gap-4 items-center px-4 py-2 bg-white shadow-xl rounded-lg transition-all hover:px-6"
            >
              <img className="h-6 w-6 m-0" src={googleIcon} />
              Login with Google
            </button>
          </Form>
        </article>
      </section>
    </>
  );
}