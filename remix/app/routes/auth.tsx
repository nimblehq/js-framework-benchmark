import { Outlet } from '@remix-run/react';

export default function Layout() {
  return (
    <main className="prose container h-full m-auto text-center flex justify-center items-center">
      <Outlet />
    </main>
  );
}
