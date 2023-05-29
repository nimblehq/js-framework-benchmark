import { NextAuthProvider } from "./session-providers";
import App from "./app";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <App>
            {children}
          </App>
        </NextAuthProvider>
      </body>
    </html>
  )
}
