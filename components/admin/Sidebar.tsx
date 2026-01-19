"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Tags,
  Store,
  Calendar,
  Gift,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Coffee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "儀表板",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "產品管理",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "分類管理",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    title: "門市管理",
    href: "/admin/stores",
    icon: Store,
  },
  {
    title: "活動管理",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    title: "促銷管理",
    href: "/admin/promotions",
    icon: Gift,
  },
  {
    title: "頁面內容",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "聯絡訊息",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "網站設定",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[#2F090C] text-white transition-all duration-300 z-50 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Coffee className="w-8 h-8 text-[#c9a227]" />
            {!collapsed && (
              <span className="font-serif text-xl font-bold">茶客棧</span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#c9a227] text-[#2F090C]"
                        : "hover:bg-white/10"
                    }`}
                    title={collapsed ? item.title : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors w-full ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "登出" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>登出</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
