"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // 如果不在登入頁面且 session 過期，強制導向登入頁面
    if (status === "unauthenticated" && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [status, isLoginPage, router]);

  // 登入頁面不需要 loading 狀態檢查
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 如果正在檢查 session 狀態，顯示載入中
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227] mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
