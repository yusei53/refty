"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export const NextAuthProvider = ({
  session,
  children
}: {
  session: Session | null;
  children: React.ReactNode;
}) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
};

/*
refetchOnWindowFocusについて
https://github.com/nextauthjs/next-auth/discussions/6342
*/
