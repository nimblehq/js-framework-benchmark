import { Link } from '@remix-run/react';

import { setButtonType } from '../../helpers/button.helper';

interface AppLinkProps {
  name: string;
  href: string;
  color?: string;
}

export default function AppLink({ name, href, color }: AppLinkProps) {
  return (
    <Link
      to={href}
      className={`text-center px-4 py-2 font-semibold shadow rounded-lg ${setButtonType(
        color
      )}`}
      data-testid={'app-link'}
    >
      {name}
    </Link>
  );
}
