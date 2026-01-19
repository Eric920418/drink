import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/providers/SessionProvider";
import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "後台管理 | 茶客棧",
  description: "茶客棧 CMS 後台管理系統",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 如果未登入且不在登入頁面，重定向到登入頁
  // 注意：這裡不能用 usePathname，因為這是 Server Component

  return (
    <SessionProvider>
      {session ? (
        <div className="min-h-screen bg-gray-100">
          <Sidebar />
          <main className="ml-64 min-h-screen transition-all duration-300">
            <div className="p-6">{children}</div>
          </main>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100">{children}</div>
      )}
    </SessionProvider>
  );
}
