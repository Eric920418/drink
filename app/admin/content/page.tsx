"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";

interface ContentBlock {
  id: number;
  key: string;
  payload: Record<string, unknown>;
}

const contentSections = [
  {
    key: "hero",
    name: "主視覺區",
    fields: [
      { name: "title", label: "標題", type: "text" },
      { name: "subtitle", label: "副標題", type: "text" },
      { name: "description", label: "描述", type: "textarea" },
      { name: "backgroundImage", label: "背景圖片 URL", type: "text" },
      { name: "ctaText", label: "按鈕文字", type: "text" },
      { name: "ctaLink", label: "按鈕連結", type: "text" },
    ],
  },
  {
    key: "about",
    name: "關於我們",
    fields: [
      { name: "title", label: "標題", type: "text" },
      { name: "description", label: "描述", type: "textarea" },
      { name: "image", label: "圖片 URL", type: "text" },
      { name: "quote", label: "引言", type: "text" },
      { name: "stats", label: "統計數據 (JSON)", type: "textarea" },
    ],
  },
  {
    key: "franchise",
    name: "加盟資訊",
    fields: [
      { name: "title", label: "標題", type: "text" },
      { name: "description", label: "描述", type: "textarea" },
      { name: "steps", label: "加盟步驟 (JSON)", type: "textarea" },
      { name: "conditions", label: "加盟條件 (JSON)", type: "textarea" },
      { name: "investment", label: "投資金額 (JSON)", type: "textarea" },
    ],
  },
  {
    key: "contact",
    name: "聯絡方式",
    fields: [
      { name: "phone", label: "電話", type: "text" },
      { name: "email", label: "電子郵件", type: "text" },
      { name: "address", label: "地址", type: "text" },
      { name: "businessHours", label: "營業時間", type: "text" },
    ],
  },
  {
    key: "footer",
    name: "頁尾資訊",
    fields: [
      { name: "description", label: "品牌描述", type: "textarea" },
      { name: "instagram", label: "Instagram 連結", type: "text" },
      { name: "facebook", label: "Facebook 連結", type: "text" },
      { name: "copyright", label: "版權聲明", type: "text" },
    ],
  },
];

export default function ContentPage() {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(contentSections[0].key);
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchContentBlocks();
  }, []);

  const fetchContentBlocks = async () => {
    try {
      const response = await fetch("/api/admin/content-blocks");
      const data = await response.json();
      setContentBlocks(data);

      // 初始化表單數據
      const initialFormData: Record<string, Record<string, string>> = {};
      contentSections.forEach((section) => {
        const block = data.find((b: ContentBlock) => b.key === section.key);
        initialFormData[section.key] = {};
        section.fields.forEach((field) => {
          const value = block?.payload?.[field.name];
          initialFormData[section.key][field.name] =
            typeof value === "object" ? JSON.stringify(value, null, 2) : value || "";
        });
      });
      setFormData(initialFormData);
    } catch {
      setError("獲取內容失敗");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const section = contentSections.find((s) => s.key === key);
      if (!section) return;

      // 處理表單數據，將 JSON 字符串轉換為對象
      const payload: Record<string, unknown> = {};
      section.fields.forEach((field) => {
        const value = formData[key][field.name];
        if (field.name.includes("stats") || field.name.includes("steps") ||
            field.name.includes("conditions") || field.name.includes("investment")) {
          try {
            payload[field.name] = JSON.parse(value || "[]");
          } catch {
            payload[field.name] = value;
          }
        } else {
          payload[field.name] = value;
        }
      });

      const response = await fetch(`/api/admin/content-blocks/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });

      if (!response.ok) {
        throw new Error("保存失敗");
      }

      setSuccess("保存成功！");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失敗");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]" />
      </div>
    );
  }

  const currentSection = contentSections.find((s) => s.key === activeSection);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">頁面內容管理</h1>
        <p className="text-gray-600 mt-1">編輯網站各區塊的內容</p>
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

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <ul className="space-y-1">
              {contentSections.map((section) => (
                <li key={section.key}>
                  <button
                    onClick={() => setActiveSection(section.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.key
                        ? "bg-[#c9a227] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {section.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{currentSection?.name}</h2>
              <button
                onClick={() => handleSave(activeSection)}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-[#2F090C] text-white rounded-lg hover:bg-[#4a1518] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                保存
              </button>
            </div>

            <div className="space-y-4">
              {currentSection?.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[activeSection]?.[field.name] || ""}
                      onChange={(e) =>
                        updateField(activeSection, field.name, e.target.value)
                      }
                      rows={field.name.includes("JSON") ? 6 : 3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none font-mono text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[activeSection]?.[field.name] || ""}
                      onChange={(e) =>
                        updateField(activeSection, field.name, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
