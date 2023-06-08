'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Header from '@components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRoot = !pathname.includes('/send');
  const { status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/auth/sign-in');
  }

  return (
    <div className="layout-default" data-testid="layout-default">
      <Header />
      <main className="app-content">
        <div className="dashboard">
          <nav className="dashboard__nav" data-testid="dashboard__nav">
            <Link
              className={classNames('dashboard__tab', {
                'dashboard__tab--selected': isRoot,
              })}
              href="/"
            >
              Manage Newsletter
            </Link>
            <Link
              href="/send"
              className={classNames('dashboard__tab', {
                'dashboard__tab--selected': !isRoot,
              })}
              data-testid="send-newsletter-tab"
            >
              Send Newsletter
            </Link>
          </nav>
          {children}
        </div>
      </main>
    </div>
  );
}
