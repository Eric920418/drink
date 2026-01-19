import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  Package,
  Store,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [
    productsCount,
    storesCount,
    eventsCount,
    messagesCount,
    unreadMessagesCount,
    categoriesCount,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.store.count(),
    prisma.event.count({ where: { isActive: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.category.count(),
  ]);

  return {
    productsCount,
    storesCount,
    eventsCount,
    messagesCount,
    unreadMessagesCount,
    categoriesCount,
  };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getStats();

  const statCards = [
    {
      title: "產品數量",
      value: stats.productsCount,
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-500",
    },
    {
      title: "門市數量",
      value: stats.storesCount,
      icon: Store,
      href: "/admin/stores",
      color: "bg-green-500",
    },
    {
      title: "進行中活動",
      value: stats.eventsCount,
      icon: Calendar,
      href: "/admin/events",
      color: "bg-purple-500",
    },
    {
      title: "未讀訊息",
      value: stats.unreadMessagesCount,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">儀表板</h1>
        <p className="text-gray-600 mt-1">
          歡迎回來，{session.user?.name || "管理員"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`${card.color} p-3 rounded-lg text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">快速操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#c9a227] hover:bg-[#c9a227]/5 transition-colors"
          >
            <Package className="w-5 h-5 text-[#c9a227]" />
            <span>新增產品</span>
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#c9a227] hover:bg-[#c9a227]/5 transition-colors"
          >
            <Calendar className="w-5 h-5 text-[#c9a227]" />
            <span>新增活動</span>
          </Link>
          <Link
            href="/admin/content"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#c9a227] hover:bg-[#c9a227]/5 transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-[#c9a227]" />
            <span>編輯首頁內容</span>
          </Link>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">系統資訊</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">產品分類</p>
            <p className="font-medium">{stats.categoriesCount} 個</p>
          </div>
          <div>
            <p className="text-gray-500">總訊息數</p>
            <p className="font-medium">{stats.messagesCount} 則</p>
          </div>
          <div>
            <p className="text-gray-500">系統版本</p>
            <p className="font-medium">1.0.0</p>
          </div>
          <div>
            <p className="text-gray-500">最後更新</p>
            <p className="font-medium">{new Date().toLocaleDateString("zh-TW")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
