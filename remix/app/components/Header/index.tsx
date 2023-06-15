import { User } from '@prisma/client';
import { Link } from '@remix-run/react';

import HeaderUserProfile from './UserProfile';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header
      data-testid="appHeader"
      className="bg-white drop-shadow-xl sticky top-0 z-10"
    >
      <nav className="px-6 py-4 flex justify-between items-center w-full">
        <Link
          to={'/'}
          className="text-xl font-bold hover:underline underline-offset-4"
        >
          RemixNewsletter 📀
        </Link>
        <HeaderUserProfile name={user.name} avatarUrl={user.avatarUrl} />
      </nav>
    </header>
  );
}
