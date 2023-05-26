import { Outlet } from '@remix-run/react';

export default function Layout() {
  return (
    <main className="h-screen w-full bg-gray-200">
      <div className="prose container h-full m-auto text-center flex justify-center items-center">
        <Outlet />
      </div>
    </main>
  );
}
