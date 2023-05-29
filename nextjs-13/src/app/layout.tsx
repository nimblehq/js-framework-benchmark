import App from './app';
import { NextAuthProvider } from './session-providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <App>{children}</App>
        </NextAuthProvider>
      </body>
    </html>
  );
}
