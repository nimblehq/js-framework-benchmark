import { useRouter } from 'next/router';
import classNames from 'classnames'; 

import { slugizePathname } from 'helpers/string.helpers';

import Card from 'components/Card';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();

  return (
    <div className={classNames('layout-auth', slugizePathname(router.pathname))}>
      <main className="app-content">
        <Card>
          {children}
        </Card>
      </main>
    </div>
  );
};

export default AuthLayout;
