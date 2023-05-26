import { Form, Outlet } from '@remix-run/react';
import { SocialsProvider } from 'remix-auth-socials';

export default function Index() {
  return (
    <section className="flex flex-col gap-4">
      <article>
        <h1 className="mb-2">Welcome to Remix</h1>
        <span>JS Framework Benchmark</span>
      </article>
      <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
        <button className="px-4 py-2 bg-indigo-900 text-white shadow-xl rounded-lg transition-all hover:px-6">
          Let's go sign in
        </button>
      </Form>
      <Outlet />
    </section>
  );
}
