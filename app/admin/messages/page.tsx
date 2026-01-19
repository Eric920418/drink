"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2, Eye, X } from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  phone: string | null;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/contact-messages");
      const data = await response.json();
      setMessages(data);
    } catch {
      setError("獲取訊息失敗");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });

      if (!response.ok) {
        throw new Error("更新失敗");
      }

      fetchMessages();
    } catch {
      setError("更新訊息狀態失敗");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("確定要刪除此訊息嗎？")) return;

    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("刪除失敗");
      }

      setSelectedMessage(null);
      fetchMessages();
    } catch {
      setError("刪除訊息失敗");
    }
  };

  const openMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      handleMarkAsRead(message.id, true);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("zh-TW");
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">聯絡訊息</h1>
        <p className="text-gray-600 mt-1">
          共 {messages.length} 則訊息，{unreadCount} 則未讀
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {messages.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => openMessage(message)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  !message.isRead ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      message.isRead
                        ? "bg-gray-100 text-gray-400"
                        : "bg-[#c9a227]/10 text-[#c9a227]"
                    }`}
                  >
                    {message.isRead ? (
                      <MailOpen className="w-5 h-5" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`font-medium ${
                          message.isRead ? "text-gray-600" : "text-gray-800"
                        }`}
                      >
                        {message.name}
                      </p>
                      <span className="text-sm text-gray-500">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    {message.subject && (
                      <p className="text-sm text-gray-600 mt-1">
                        {message.subject}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">沒有聯絡訊息</p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSelectedMessage(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full">
              <div className="border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">訊息詳情</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">姓名</label>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">電子郵件</label>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="text-sm text-gray-500">電話</label>
                      <p className="font-medium">{selectedMessage.phone}</p>
                    </div>
                  )}
                  {selectedMessage.subject && (
                    <div>
                      <label className="text-sm text-gray-500">主旨</label>
                      <p className="font-medium">{selectedMessage.subject}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500">訊息內容</label>
                  <p className="mt-1 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  收到時間：{formatDate(selectedMessage.createdAt)}
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <button
                    onClick={() =>
                      handleMarkAsRead(
                        selectedMessage.id,
                        !selectedMessage.isRead
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {selectedMessage.isRead ? (
                      <>
                        <Mail className="w-4 h-4" />
                        標記為未讀
                      </>
                    ) : (
                      <>
                        <MailOpen className="w-4 h-4" />
                        標記為已讀
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    刪除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
