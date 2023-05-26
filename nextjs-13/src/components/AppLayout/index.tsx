"use client";

import {
  UserState,
  UserContext,
  UserContextValue,
} from '../../context/user.context';
import { useCallback, useEffect, useMemo, useState } from 'react';
import requestManager from '../../lib/request/manager';
import 'stylesheets/application.scss';
import { ApiMeResponse } from "../../app/api/v1/me/route";
import Header from "@components/Header";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserState>(undefined);

  const fetchCurrentUser = useCallback(async () => {
    const { user: currentUser } = await requestManager<ApiMeResponse>(
      'GET',
      'v1/me'
    );

    setUser(currentUser);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const userContextValue = useMemo<UserContextValue>(
    () => ({ user, setUser }),
    [user]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <div className="layout-default">
        <Header />
        <main className="app-content">{children}</main>
      </div>
    </UserContext.Provider>
  )
}
