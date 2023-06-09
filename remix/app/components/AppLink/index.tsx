import { Link } from '@remix-run/react';

import { setButtonColor } from '../../helpers/button.helper';

interface ButtonProps {
  name: string;
  href: string;
  color?: string;
}

export default function AppLink({ name, href, color }: ButtonProps) {
  return (
    <Link
      to={href}
      className={`text-center px-4 py-2 font-semibold shadow rounded-lg ${setButtonColor(
        color
      )}`}
      data-testid={'app-link'}
    >
      {name}
    </Link>
  );
}
