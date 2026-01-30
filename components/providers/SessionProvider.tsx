"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider
      // 每 60 秒檢查一次 session 狀態，確保 token 過期時能即時偵測
      refetchInterval={60}
      // 當視窗重新獲得焦點時也檢查 session
      refetchOnWindowFocus={true}
    >
      {children}
    </NextAuthSessionProvider>
  );
}
