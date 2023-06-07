'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import App from './app';
import { NextAuthProvider } from './session-providers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainerWrapper } from './toast-container-wrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const classNames = require('classnames');
  const isRoot = !pathname.includes('/send');

  return (
    <html lang="en">
      <body>
        <ToastContainerWrapper />
        <NextAuthProvider>
          <App>
            <div className="dashboard">
              <nav className="dashboard__nav">
                <Link
                  className={classNames('dashboard__tab', {
                    'dashboard__tab--selected': isRoot,
                  })}
                  href="/"
                >
                  Manage Newsletter
                </Link>
                {/* <div className="dashboard__tab dashboard__tab--selected">
                Manage Newsletter
              </div> */}
                <Link
                  href="/send"
                  className={classNames('dashboard__tab', {
                    'dashboard__tab--selected': !isRoot,
                  })}
                >
                  Send Newsletter
                </Link>
              </nav>
              {children}
            </div>
          </App>
        </NextAuthProvider>
      </body>
    </html>
  );
}
