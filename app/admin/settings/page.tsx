"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";

interface Settings {
  siteName?: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  businessHours?: string;
  instagram?: string;
  facebook?: string;
  lineAt?: string;
  copyright?: string;
}

const settingFields = [
  { key: "siteName", label: "網站名稱", type: "text", placeholder: "茶客棧" },
  { key: "logo", label: "Logo URL", type: "text", placeholder: "Logo 圖片連結" },
  { key: "phone", label: "客服電話", type: "text", placeholder: "0800-TEA-TIME" },
  { key: "email", label: "客服信箱", type: "email", placeholder: "hello@teainn.tw" },
  { key: "address", label: "公司地址", type: "text", placeholder: "台北市信義區..." },
  { key: "businessHours", label: "營業時間", type: "text", placeholder: "10:00-22:00" },
  { key: "instagram", label: "Instagram", type: "url", placeholder: "https://instagram.com/..." },
  { key: "facebook", label: "Facebook", type: "url", placeholder: "https://facebook.com/..." },
  { key: "lineAt", label: "LINE@", type: "text", placeholder: "@teainn" },
  { key: "copyright", label: "版權聲明", type: "text", placeholder: "© 2026 TeaInn" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      setSettings(data);
    } catch {
      setError("獲取設定失敗");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("保存失敗");
      }

      setSuccess("設定已保存！");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失敗");
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">網站設定</h1>
          <p className="text-gray-600 mt-1">管理網站基本資訊</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[#2F090C] text-white rounded-lg hover:bg-[#4a1518] transition-colors disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          保存設定
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {success}
        </div>
      )}

      {/* Settings Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                value={(settings as Record<string, string>)[field.key] || ""}
                onChange={(e) => updateSetting(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-red-200">
        <h2 className="text-lg font-semibold text-red-600 mb-4">危險區域</h2>
        <p className="text-gray-600 mb-4">
          以下操作可能會影響網站運作，請謹慎操作。
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (confirm("確定要清除所有快取嗎？")) {
                alert("快取已清除（模擬）");
              }
            }}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            清除快取
          </button>
        </div>
      </div>
    </div>
  );
}
