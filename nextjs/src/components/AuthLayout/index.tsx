import classNames from 'classnames';
import { useRouter } from 'next/router';

import Card from 'components/Card';
import { slugizePathname } from 'helpers/string.helpers';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();

  return (
    <div
      className={classNames('layout-auth', slugizePathname(router.pathname))}
    >
      <main className="app-content">
        <Card>{children}</Card>
      </main>
    </div>
  );
};

export default AuthLayout;
