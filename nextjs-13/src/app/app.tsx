'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePathname } from 'next/navigation';

import { ApiMeResponse } from './api/v1/me/route';
import AppLayout from '../components/AppLayout';
import AuthLayout from '../components/AuthLayout';
import PublicLayout from '../components/PublicLayout';
import '../stylesheets/application.scss';
import {
  UserState,
  UserContext,
  UserContextValue,
} from '../context/user.context';
import requestManager from '../lib/request/manager';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

  if (pathname.includes('/sign-in')) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  if (pathname.includes('/newsletter')) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  return (
    <UserContext.Provider value={userContextValue}>
      <AppLayout>{children}</AppLayout>
    </UserContext.Provider>
  );
}
