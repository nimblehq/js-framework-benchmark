import { useCallback, useEffect, useMemo, useState } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import {
  UserState,
  UserContext,
  UserContextValue,
} from '../context/user.context';
import requestManager from '../lib/request/manager';
import { ApiMeResponse } from './api/v1/me';

import '../stylesheets/application.css';

type AppNextPage = NextPage & {
  authRequired?: boolean;
};

type CustomAppProps = AppProps & {
  Component: AppNextPage;
};

const App = ({ Component, pageProps }: CustomAppProps) => {
  const [user, setUser] = useState<UserState>('loading');

  const fetchCurrentUser = useCallback(async () => {
    const { user: currentUser } = await requestManager<ApiMeResponse>(
      'GET',
      'v1/me'
    );

    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (Component.authRequired) {
      void fetchCurrentUser();
    }
  }, [fetchCurrentUser, Component]);

  const userContextValue = useMemo<UserContextValue>(
    () => ({ user, setUser }),
    [user]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <Head>
        <title>NextNewsletter 🚀</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app-content">
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
};

export default App;
