"use client";

import { SessionProvider } from "next-auth/react";
import App from "./app";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
  <SessionProvider>
    <App>
      {children}
    </App>
  </SessionProvider>
  )
};
