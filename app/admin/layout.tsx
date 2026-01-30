import SessionProvider from "@/components/providers/SessionProvider";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminContent from "@/components/admin/AdminContent";

export const metadata = {
  title: "後台管理 | 茶客棧",
  description: "茶客棧 CMS 後台管理系統",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>
        <AdminContent>{children}</AdminContent>
      </AuthGuard>
    </SessionProvider>
  );
}
