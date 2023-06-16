import { Link } from '@remix-run/react';

import { setButtonType } from './helper';

interface AppLinkProps {
  name: string;
  href: string;
  type?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
}

export default function AppLink({ name, href, type }: AppLinkProps) {
  return (
    <Link
      to={href}
      className={`text-center px-4 py-2 font-semibold shadow rounded-lg ${setButtonType(
        type
      )}`}
      data-testid={'app-link'}
    >
      {name}
    </Link>
  );
}
