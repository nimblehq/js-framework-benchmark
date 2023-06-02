import { User } from '@prisma/client';

import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div data-testid="app-layout">
      <Header user={user} />
      <main className="container m-auto py-6 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
