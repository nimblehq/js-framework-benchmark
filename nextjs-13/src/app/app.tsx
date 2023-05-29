"use client"
import AuthLayout from "../components/AuthLayout";
import AppLayout from "../components/AppLayout";
import { usePathname } from 'next/navigation';
import '../stylesheets/application.scss';
import {
  UserState,
  UserContext,
  UserContextValue,
} from '../context/user.context';
import { useCallback, useEffect, useMemo, useState } from 'react';
import requestManager from '../lib/request/manager';
import { ApiMeResponse } from "./api/v1/me/route";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  if (pathname.includes('/sign-in')) {
    return <AuthLayout>{children}</AuthLayout>
  }

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
      <AppLayout>{children}</AppLayout>
    </UserContext.Provider>
  )
}