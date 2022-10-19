import type { ReactElement, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import {
  UserState,
  UserContext,
  UserContextValue,
} from '../context/user.context';
import requestManager from '../lib/request/manager';
import { ApiMeResponse } from './api/v1/me';

import 'stylesheets/application.scss';

export type AppNextPage = NextPage & {
  authRequired?: boolean;
  setLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps = AppProps & {
  Component: AppNextPage;
};

const App = ({ Component, pageProps }: CustomAppProps) => {
  const [user, setUser] = useState<UserState>(undefined);

  const fetchCurrentUser = useCallback(async () => {
    const { user: currentUser } = await requestManager<ApiMeResponse>(
      'GET',
      'v1/me'
    );

    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (Component.authRequired && !user) {
      void fetchCurrentUser();
    }
  }, [fetchCurrentUser, Component]);

  const userContextValue = useMemo<UserContextValue>(
    () => ({ user, setUser }),
    [user]
  );

  // Use the layout defined at the page level or fallback to the default layout
  const withLayout =
    Component.setLayout ??
    ((page: ReactElement) => {
      return (
        <UserContext.Provider value={userContextValue}>
          <AppLayout>{page}</AppLayout>
        </UserContext.Provider>
      );
    });

  return withLayout(
    <>
      <Head>
        <title>NextNewsletter 🚀</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
