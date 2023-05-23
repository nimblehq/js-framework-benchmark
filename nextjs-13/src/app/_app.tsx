import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import type { ReactElement, ReactNode } from 'react';

export type AppNextPage = NextPage & {
  authRequired?: boolean;
  setLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps = AppProps & {
  Component: AppNextPage;
};

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}