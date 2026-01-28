"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Plus, Trash2, GripVertical } from "lucide-react";

interface ContentBlock {
  id: number;
  key: string;
  payload: Record<string, unknown>;
}

interface StatItem {
  value: string;
  label: string;
}

interface StepItem {
  step: string;
  title: string;
  desc: string;
}

interface InvestmentItem {
  label: string;
  value: string;
}

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

// 統計數據編輯器
function StatsEditor({
  value,
  onChange,
}: {
  value: StatItem[];
  onChange: (value: StatItem[]) => void;
}) {
  const addItem = () => {
    onChange([...value, { value: "", label: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof StatItem, val: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], [field]: val };
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
        >
          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">數值</label>
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateItem(index, "value", e.target.value)}
                placeholder="例：500+"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">標籤</label>
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateItem(index, "label", e.target.value)}
                placeholder="例：日均新鮮茶飲"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 text-sm text-[#c9a227] border border-dashed border-[#c9a227] rounded-lg hover:bg-[#c9a227]/5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        新增統計項目
      </button>
    </div>
  );
}

// 加盟步驟編輯器
function StepsEditor({
  value,
  onChange,
}: {
  value: StepItem[];
  onChange: (value: StepItem[]) => void;
}) {
  const addItem = () => {
    const nextStep = String(value.length + 1).padStart(2, "0");
    onChange([...value, { step: nextStep, title: "", desc: "" }]);
  };

  const removeItem = (index: number) => {
    const newValue = value
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        step: String(i + 1).padStart(2, "0"),
      }));
    onChange(newValue);
  };

  const updateItem = (index: number, field: keyof StepItem, val: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], [field]: val };
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-[#c9a227] text-white rounded-full font-bold flex-shrink-0">
            {item.step}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem(index, "title", e.target.value)}
              placeholder="步驟標題"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
            />
            <input
              type="text"
              value={item.desc}
              onChange={(e) => updateItem(index, "desc", e.target.value)}
              placeholder="步驟說明"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 text-sm text-[#c9a227] border border-dashed border-[#c9a227] rounded-lg hover:bg-[#c9a227]/5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        新增步驟
      </button>
    </div>
  );
}

// 加盟條件編輯器（字符串數組）
function ConditionsEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const addItem = () => {
    onChange([...value, ""]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, val: string) => {
    const newValue = [...value];
    newValue[index] = val;
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center bg-[#c9a227]/10 text-[#c9a227] rounded text-sm font-medium flex-shrink-0">
            {index + 1}
          </span>
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="輸入加盟條件..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 text-sm text-[#c9a227] border border-dashed border-[#c9a227] rounded-lg hover:bg-[#c9a227]/5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        新增條件
      </button>
    </div>
  );
}

// 投資金額編輯器
function InvestmentEditor({
  value,
  onChange,
}: {
  value: InvestmentItem[];
  onChange: (value: InvestmentItem[]) => void;
}) {
  const addItem = () => {
    onChange([...value, { label: "", value: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof InvestmentItem,
    val: string
  ) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], [field]: val };
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs text-gray-500 font-medium px-1">
        <span>項目名稱</span>
        <span>金額</span>
        <span className="w-10"></span>
      </div>
      {value.map((item, index) => (
        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <input
            type="text"
            value={item.label}
            onChange={(e) => updateItem(index, "label", e.target.value)}
            placeholder="例：加盟金"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
          />
          <input
            type="text"
            value={item.value}
            onChange={(e) => updateItem(index, "value", e.target.value)}
            placeholder="例：NT$ 300,000"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 text-sm text-[#c9a227] border border-dashed border-[#c9a227] rounded-lg hover:bg-[#c9a227]/5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        新增費用項目
      </button>
    </div>
  );
}

// 加盟優勢編輯器
function BenefitsEditor({
  value,
  onChange,
}: {
  value: BenefitItem[];
  onChange: (value: BenefitItem[]) => void;
}) {
  const iconOptions = [
    { value: "TrendingUp", label: "趨勢上升" },
    { value: "Award", label: "獎章" },
    { value: "Headphones", label: "客服耳機" },
    { value: "Shield", label: "盾牌" },
    { value: "Star", label: "星星" },
    { value: "Heart", label: "愛心" },
    { value: "Zap", label: "閃電" },
    { value: "Target", label: "目標" },
  ];

  const addItem = () => {
    onChange([...value, { icon: "Star", title: "", description: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof BenefitItem, val: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], [field]: val };
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              優勢 {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">圖標</label>
              <select
                value={item.icon}
                onChange={(e) => updateItem(index, "icon", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none bg-white"
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">標題</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                placeholder="例：成熟商業模式"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">說明</label>
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                updateItem(index, "description", e.target.value)
              }
              placeholder="詳細說明..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 text-sm text-[#c9a227] border border-dashed border-[#c9a227] rounded-lg hover:bg-[#c9a227]/5 transition-colors"
      >
        <Plus className="w-4 h-4" />
        新增優勢
      </button>
    </div>
  );
}

// 定義各區塊的字段配置
type FieldType = "text" | "textarea" | "stats" | "steps" | "conditions" | "investment" | "benefits";

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
}

interface SectionConfig {
  key: string;
  name: string;
  fields: FieldConfig[];
}

const contentSections: SectionConfig[] = [
  {
    key: "hero",
    name: "主視覺區",
    fields: [
      { name: "title", label: "標題", type: "text" },
      { name: "subtitle", label: "副標題（如 Since 2020）", type: "text" },
      { name: "tagline1", label: "標語1（如 尋常品茗）", type: "text" },
      { name: "tagline2", label: "標語2（如 不尋常的堅持）", type: "text" },
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
      { name: "stats", label: "統計數據", type: "stats" },
    ],
  },
  {
    key: "franchise",
    name: "加盟資訊",
    fields: [
      { name: "title", label: "標題", type: "text" },
      { name: "description", label: "描述", type: "textarea" },
      { name: "benefits", label: "加盟優勢", type: "benefits" },
      { name: "steps", label: "加盟步驟", type: "steps" },
      { name: "conditions", label: "加盟條件", type: "conditions" },
      { name: "investment", label: "投資金額", type: "investment" },
      { name: "ctaTitle", label: "CTA 標題", type: "text" },
      { name: "ctaDescription", label: "CTA 說明", type: "textarea" },
    ],
  },
  {
    key: "contact",
    name: "聯絡方式",
    fields: [
      { name: "phone", label: "客服專線", type: "text" },
      { name: "phone2", label: "客服電話2", type: "text" },
      { name: "email", label: "電子郵件", type: "text" },
      { name: "email2", label: "加盟電子郵件", type: "text" },
      { name: "address", label: "總部地址", type: "text" },
      { name: "businessHours", label: "服務時間", type: "text" },
      { name: "businessHours2", label: "休息日說明", type: "text" },
    ],
  },
  {
    key: "footer",
    name: "頁尾資訊",
    fields: [
      { name: "description", label: "品牌描述", type: "textarea" },
      { name: "instagram", label: "Instagram 連結", type: "text" },
      { name: "facebook", label: "Facebook 連結", type: "text" },
      { name: "email", label: "電子郵件", type: "text" },
      { name: "phone", label: "客服專線", type: "text" },
      { name: "address", label: "總部地址", type: "text" },
      { name: "businessHours", label: "營業時間", type: "text" },
      { name: "copyright", label: "版權聲明", type: "text" },
    ],
  },
];

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(contentSections[0].key);
  const [formData, setFormData] = useState<Record<string, Record<string, unknown>>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchContentBlocks();
  }, []);

  const fetchContentBlocks = async () => {
    try {
      const response = await fetch("/api/admin/content-blocks");
      const data = await response.json();

      // 初始化表單數據
      const initialFormData: Record<string, Record<string, unknown>> = {};
      contentSections.forEach((section) => {
        const block = data.find((b: ContentBlock) => b.key === section.key);
        initialFormData[section.key] = {};
        section.fields.forEach((field) => {
          const value = block?.payload?.[field.name];
          // 保持原始類型，不轉換為字符串
          if (value !== undefined && value !== null) {
            initialFormData[section.key][field.name] = value;
          } else {
            // 根據字段類型設置默認值
            if (["stats", "steps", "conditions", "investment", "benefits"].includes(field.type)) {
              initialFormData[section.key][field.name] = [];
            } else {
              initialFormData[section.key][field.name] = "";
            }
          }
        });
      });
      setFormData(initialFormData);
    } catch (err) {
      setError(`獲取內容失敗: ${err instanceof Error ? err.message : String(err)}`);
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

      // 直接使用表單數據，已經是正確的類型
      const payload: Record<string, unknown> = {};
      section.fields.forEach((field) => {
        payload[field.name] = formData[key][field.name];
      });

      const response = await fetch(`/api/admin/content-blocks/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "保存失敗");
      }

      setSuccess("保存成功！");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失敗");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section: string, field: string, value: unknown) => {
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

  const renderField = (field: FieldConfig) => {
    const value = formData[activeSection]?.[field.name];

    switch (field.type) {
      case "stats":
        return (
          <StatsEditor
            value={(value as StatItem[]) || []}
            onChange={(v) => updateField(activeSection, field.name, v)}
          />
        );
      case "steps":
        return (
          <StepsEditor
            value={(value as StepItem[]) || []}
            onChange={(v) => updateField(activeSection, field.name, v)}
          />
        );
      case "conditions":
        return (
          <ConditionsEditor
            value={(value as string[]) || []}
            onChange={(v) => updateField(activeSection, field.name, v)}
          />
        );
      case "investment":
        return (
          <InvestmentEditor
            value={(value as InvestmentItem[]) || []}
            onChange={(v) => updateField(activeSection, field.name, v)}
          />
        );
      case "benefits":
        return (
          <BenefitsEditor
            value={(value as BenefitItem[]) || []}
            onChange={(v) => updateField(activeSection, field.name, v)}
          />
        );
      case "textarea":
        return (
          <textarea
            value={(value as string) || ""}
            onChange={(e) => updateField(activeSection, field.name, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
          />
        );
      default:
        return (
          <input
            type="text"
            value={(value as string) || ""}
            onChange={(e) => updateField(activeSection, field.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none"
          />
        );
    }
  };

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

            <div className="space-y-6">
              {currentSection?.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
