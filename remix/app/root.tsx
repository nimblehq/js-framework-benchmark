import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { LinksFunction, LoaderArgs, json } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { StatusCodes } from 'http-status-codes';

import { commitSession, getSession } from './config/session.server';
import stylesheet from '../app/stylesheets/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const toastMessage = session.get('toastMessage') || null;
  const toastMode = session.get('toastMode') || null;

  return json(
    { toastMessage, toastMode },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}

export default function App() {
  const { toastMessage, toastMode } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    if (toastMode === 'success') {
      toast.success(toastMessage);
    } else if (toastMode === 'error') {
      toast.error(toastMessage);
    } else {
      toast(toastMessage);
    }
  }, [toastMessage]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Remix App Benchmark ⚔</title>
        <Meta />
        <Links />
      </head>
      <body className="h-screen w-full bg-gray-200">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (
    isRouteErrorResponse(error) &&
    error.status === StatusCodes.UNAUTHORIZED
  ) {
    return (
      <div>
        <h3>You must be logged.</h3>
        <Link to={'/auth/sign-in'}>Login with Google</Link>;
      </div>
    );
  }

  return <div>Something unexpected went wrong. Sorry about that.</div>;
}
