import App from './app';
import { NextAuthProvider } from './session-providers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainerWrapper } from './toast-container-wrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainerWrapper />
        <NextAuthProvider>
          <App>{children}</App>
        </NextAuthProvider>
      </body>
    </html>
  );
}
