# 茶客棧 TeaInn - 飲料店官網

茶客棧官方網站，展示品牌形象、茶品菜單、門市據點與加盟資訊。

原始設計稿：[Figma](https://www.figma.com/design/2AX2u5R69cN4WfxmRvFEO4/%E9%A3%B2%E6%96%99%E5%BA%97%E5%AE%98%E7%B6%B2%E8%A8%AD%E8%A8%88)

## 設計理念

### 東方墨韻 × 現代極簡

茶客棧採用獨特的「東方墨韻」視覺風格，融合傳統茶文化美學與現代極簡設計：

**配色系統**
- **翡翠綠（Logo 色）**：深翡翠 (#013d18)、品牌綠 (#015e24)、翠玉綠 (#1a7a3a)
- **宣紙絹白**：絹白 (#f8f6f2)、宣紙色 (#edeae3)、暖沙 (#d8d4c9)
- **金箔茶器**：金銅色 (#c4964a)、淺金色 (#d4a85a)

**字體選擇**
- 標題：Noto Serif TC（思源宋體）- 呈現東方書法韻味
- 內文：Noto Sans TC（思源黑體）- 確保良好閱讀性

**設計特色**
- 印章風格的 Logo 設計
- 水墨暈染的背景效果
- 宣紙紋理質感
- 茶葉飄落的微動畫
- 深淺交替的區塊節奏

## 技術棧

- **框架**: Next.js 15 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS v4
- **動畫**: Motion (Framer Motion)
- **UI 組件**: Radix UI + shadcn/ui
- **圖標**: Lucide React
- **字體**: Google Fonts (Noto Serif TC, Noto Sans TC)

## 開發環境

### 安裝依賴

```bash
pnpm install
```

### 啟動開發伺服器

```bash
pnpm dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 生產構建

```bash
pnpm build
pnpm start
```

## 專案結構

```
/drink
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根佈局（含字體配置）
│   ├── page.tsx            # 首頁
│   └── globals.css         # 全局樣式 (設計系統)
├── components/             # React 組件
│   ├── Navigation.tsx      # 導航欄（印章 Logo + 透明/實色切換）
│   ├── Hero.tsx            # 首頁主視覺（水墨風格 + 視差滾動）
│   ├── About.tsx           # 關於我們（茶道哲學）
│   ├── Products.tsx        # 茶品菜單（分類篩選 + 印章價格標籤）
│   ├── Events.tsx          # 活動專區
│   ├── Franchise.tsx       # 加盟資訊
│   ├── Stores.tsx          # 門市據點
│   ├── Contact.tsx         # 聯絡我們
│   ├── Footer.tsx          # 頁尾
│   ├── figma/              # Figma 衍生組件
│   │   └── ImageWithFallback.tsx
│   └── ui/                 # shadcn/ui 組件
├── public/                 # 靜態資源
│   └── images/
│       └── hero-bg.png     # 首頁背景圖
├── next.config.ts          # Next.js 配置
├── postcss.config.mjs      # PostCSS 配置
├── tsconfig.json           # TypeScript 配置
└── package.json
```

## 頁面區塊

1. **Navigation** - 固定頂部導航，印章風格 Logo，滾動時背景切換
2. **Hero** - 全螢幕水墨主視覺，茶葉飄落動畫，視差滾動效果
3. **About** - 茶道哲學區塊，浮動引言卡片
4. **Products** - 茶品展示，印章風格價格標籤，分類篩選
5. **Events** - 活動專區，交錯佈局
6. **Franchise** - 加盟資訊，流程時間軸
7. **Stores** - 門市據點卡片
8. **Contact** - 聯絡表單
9. **Footer** - 品牌資訊與訂閱功能

## 設計系統

### CSS 變數

```css
/* 主色調 - 翡翠綠（Logo 色系） */
--tea-ink: #013d18;      /* 深翡翠 - 最深背景 */
--tea-forest: #015e24;   /* 品牌綠 - Logo 主色 */
--tea-jade: #1a7a3a;     /* 翠玉綠 - 強調色 */
--tea-sage: #5a9a6a;     /* 淺翠綠 */
--tea-mint: #8bc4a0;     /* 薄荷綠 */

/* 輔助色 - 宣紙絹白 */
--silk-white: #f8f6f2;
--paper-cream: #edeae3;
--warm-sand: #d8d4c9;

/* 點綴色 - 金箔茶器 */
--terracotta: #c4964a;   /* 金銅色 */
--rust-copper: #d4a85a;  /* 淺金色 */
--deep-amber: #9a7a3a;   /* 深金色 */
```

### 自訂工具類

- `.texture-ink` - 水墨紋理背景
- `.texture-paper` - 宣紙紋理
- `.brush-underline` - 毛筆下劃線效果
- `.stamp` - 印章效果
- `.animate-float` - 茶葉漂浮動畫
- `.animate-ink` - 墨暈擴散動畫
- `.font-serif` - 書法風格標題字體
