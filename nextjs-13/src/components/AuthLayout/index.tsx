'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Card from 'components/Card';
export default function Layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === 'authenticated') {
    redirect('/');
  }

  return (
    <div className="layout-auth" data-testid="layout-auth">
      <main className="app-content">
        <Card>{children}</Card>
      </main>
    </div>
  );
}
