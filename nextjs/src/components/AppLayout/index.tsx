import classNames from 'classnames';
import { useRouter } from 'next/router';

import { slugizePathname } from 'helpers/string.helpers';

import Header from '../Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();

  return (
    <div
      className={classNames('layout-default', slugizePathname(router.pathname))}
      data-testid="appLayout"
    >
      <Header />
      <main className="app-content">{children}</main>
    </div>
  );
};

export default AppLayout;
