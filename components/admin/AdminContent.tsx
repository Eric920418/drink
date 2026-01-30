"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";
  const isAuthenticated = status === "authenticated";

  // 登入頁面：不顯示 Sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-100">{children}</div>;
  }

  // 已登入：顯示完整後台介面（含 Sidebar）
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <main className="ml-64 min-h-screen transition-all duration-300">
          <div className="p-6">{children}</div>
        </main>
      </div>
    );
  }

  // 載入中或未登入（AuthGuard 會處理重定向）：顯示簡單版面
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
