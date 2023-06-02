import { Outlet } from '@remix-run/react';

import Layout from '../components/AuthLayout';

export default function Index() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
