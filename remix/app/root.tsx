import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import { StatusCodes } from 'http-status-codes';

import {
  getNotification,
  removeNotification,
} from './helpers/localStorage.helper';
import showNotification from './lib/notification/showNotification';
import { Notification } from './types';
import stylesheet from '../app/stylesheets/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  const { type, text } =
    typeof window !== 'undefined' ? getNotification() : ({} as Notification);

  useEffect(() => {
    if (!text) {
      return;
    }

    showNotification({ text: text as string, type: type as string });

    removeNotification();
  }, [text]);

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

  if (isRouteErrorResponse(error) && error.status === StatusCodes.NOT_FOUND) {
    return (
      <div>
        <h3>{error.statusText}</h3>
        <Link to={'/'}>Go to home</Link>;
      </div>
    );
  }

  return <div>Something unexpected went wrong. Sorry about that.</div>;
}
