'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  return (
    <div className="public" data-testid="public-newsletter">
      {status === 'unauthenticated' && (
        <div className="banner" data-testid="banner">
          <Link href="auth/sign-in">Sign up now</Link> to create your own
          newsletters
        </div>
      )}
      <main className="app-content">{children}</main>
    </div>
  );
}
