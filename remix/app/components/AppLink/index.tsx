import { Link } from '@remix-run/react';

interface ButtonProps {
  name: string;
  href: string;
}

export default function AppLink({ name, href }: ButtonProps) {
  return (
    <Link
      to={href}
      className="text-center px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-700 shadow rounded-lg"
      data-testid={'app-link'}
    >
      {name}
    </Link>
  );
}
