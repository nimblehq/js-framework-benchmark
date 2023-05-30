'use client';

import 'stylesheets/application.scss';
import Header from '@components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-default" data-testid="layout-default">
      <Header />
      <main className="app-content">{children}</main>
    </div>
  );
}
