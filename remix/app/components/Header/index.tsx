import { Link } from '@remix-run/react';

export default function Header() {
  return (
    <header className="bg-white drop-shadow-xl">
      <nav className="px-6 py-4 flex justify-between w-full">
        <Link
          to={'/'}
          className="text-xl font-bold hover:underline underline-offset-4"
        >
          RemixNewsletter 📀
        </Link>
      </nav>
    </header>
  );
}
