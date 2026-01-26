# 茶客棧 TeaInn - 飲料店官網

茶客棧官方網站，展示品牌形象、茶品菜單、門市據點與加盟資訊。含完整 CMS 後台管理系統。

原始設計稿：[Figma](https://www.figma.com/design/2AX2u5R69cN4WfxmRvFEO4/%E9%A3%B2%E6%96%99%E5%BA%97%E5%AE%98%E7%B6%B2%E8%A8%AD%E8%A8%88)

## 功能特色

### 前台網站
- 品牌形象展示
- 茶品菜單瀏覽（首頁精選 + `/menu` 完整茶單頁面）
- 門市據點（`/stores` 獨立頁面，含搜尋篩選功能）
- 活動專區（`/events` 列表頁 + `/events/[slug]` 詳情頁）
- 加盟資訊（`/franchise` 獨立頁面，展示加盟方案與流程）
- 聯絡表單

### CMS 後台管理
- **產品管理**：新增、編輯、刪除產品，設定分類、價格、尺寸、加料選項（Slug 自動隨機生成）
- **分類管理**：管理產品分類
- **門市管理**：管理門市據點資訊（地址、營業時間、地圖連結、線上訂購連結）
- **活動管理**：管理活動與促銷
- **促銷管理**：管理首頁促銷橫幅
- **加盟方案**：管理加盟方案（投資金額、方案特色、包含項目）
- **頁面內容**：編輯首頁各區塊內容（Hero、關於、加盟、聯絡等）
- **聯絡訊息**：查看和管理客戶聯絡訊息
- **網站設定**：設定網站基本資訊

## 設計理念

### 東方墨韻 × 現代極簡

茶客棧採用獨特的「東方墨韻」視覺風格，融合傳統茶文化美學與現代極簡設計：

**配色系統**
- **古典酒紅（品牌主色）**：深酒紅 (#2F090C)、暗紅木 (#4a1518)、赤褐 (#6b2428)
- **宣紙絹白**：絹白 (#faf8f5)、宣紙色 (#f2ede6)、暖沙 (#e5ddd2)
- **古銅金箔**：古銅金 (#c9a227)、淺金色 (#d4b84a)

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
- **資料庫**: PostgreSQL (Neon)
- **ORM**: Prisma 7
- **認證**: NextAuth.js
- **圖片存儲**: Cloudflare R2 (可選)

## 開發環境

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 環境變數設定

複製 `.env.example` 或建立 `.env` 檔案：

```env
# Database - Neon PostgreSQL
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"

# Cloudflare R2 Storage (可選)
R2_ENDPOINT="https://xxx.r2.cloudflarestorage.com"
R2_BUCKET_NAME="drink"
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_PUBLIC_URL=""
```

### 3. 資料庫設定

```bash
# 執行資料庫遷移
npx prisma migrate dev

# 導入種子數據
pnpm db:seed
```

### 4. 啟動開發伺服器

```bash
pnpm dev
```

- 前台：[http://localhost:3000](http://localhost:3000)
- 後台：[http://localhost:3000/admin](http://localhost:3000/admin)
- 預設帳號：admin / admin123

### 生產構建

```bash
pnpm build
pnpm start
```

## 專案結構

```
/drink
├── app/
│   ├── menu/                   # 完整茶單頁面
│   ├── events/                 # 活動專區
│   │   ├── page.tsx            # 活動列表頁
│   │   └── [slug]/page.tsx     # 活動詳情頁
│   ├── admin/                  # CMS 後台頁面
│   │   ├── login/              # 登入頁面
│   │   ├── dashboard/          # 儀表板
│   │   ├── products/           # 產品管理
│   │   ├── categories/         # 分類管理
│   │   ├── stores/             # 門市管理
│   │   ├── events/             # 活動管理
│   │   ├── promotions/         # 促銷管理
│   │   ├── content/            # 頁面內容
│   │   ├── messages/           # 聯絡訊息
│   │   └── settings/           # 網站設定
│   ├── api/
│   │   ├── admin/              # 後台 API
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── stores/
│   │   │   ├── events/
│   │   │   ├── promotions/
│   │   │   ├── content-blocks/
│   │   │   ├── contact-messages/
│   │   │   ├── settings/
│   │   │   └── upload/
│   │   ├── auth/               # NextAuth API
│   │   ├── products/           # 前台產品 API
│   │   ├── categories/         # 前台分類 API
│   │   ├── stores/             # 前台門市 API
│   │   ├── events/             # 前台活動 API
│   │   ├── content/            # 前台內容 API
│   │   └── contact/            # 聯絡表單 API
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── admin/                  # 後台組件
│   │   ├── Sidebar.tsx
│   │   └── ImageUploader.tsx
│   ├── providers/
│   │   └── SessionProvider.tsx
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Products.tsx
│   ├── Events.tsx
│   ├── Franchise.tsx
│   ├── Stores.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── prisma.ts               # Prisma Client
│   ├── auth.ts                 # NextAuth 配置
│   ├── api-auth.ts             # API 認證工具
│   └── r2.ts                   # R2 上傳工具
├── prisma/
│   ├── schema.prisma           # 資料庫 Schema
│   ├── seed.ts                 # 種子數據
│   └── migrations/             # 遷移檔案
└── public/
```

## 資料庫 Schema

### 主要模型

- **Admin** - 管理員帳號
- **Category** - 產品分類
- **Product** - 產品（含尺寸、加料）
- **ProductSize** - 產品尺寸
- **ProductTopping** - 加料選項
- **Store** - 門市據點
- **Event** - 活動
- **Promotion** - 促銷優惠
- **ContentBlock** - 頁面內容區塊（hero、about、franchise、contact、footer）
- **ContactMessage** - 聯絡訊息
- **SiteSetting** - 網站設定

## API 端點

### 公開 API（前台）

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/products` | 獲取所有產品 |
| GET | `/api/categories` | 獲取所有分類 |
| GET | `/api/stores` | 獲取所有門市 |
| GET | `/api/events` | 獲取所有活動 |
| GET | `/api/events/[slug]` | 獲取單一活動詳情 |
| GET | `/api/content/[key]` | 獲取頁面內容 |
| POST | `/api/contact` | 提交聯絡表單 |

### 後台 API（需認證）

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET/POST | `/api/admin/products` | 產品列表/新增 |
| GET/PUT/DELETE | `/api/admin/products/[id]` | 產品詳情/更新/刪除 |
| GET/POST | `/api/admin/categories` | 分類列表/新增 |
| GET/PUT/DELETE | `/api/admin/categories/[id]` | 分類詳情/更新/刪除 |
| GET/POST | `/api/admin/stores` | 門市列表/新增 |
| GET/PUT/DELETE | `/api/admin/stores/[id]` | 門市詳情/更新/刪除 |
| GET/POST | `/api/admin/events` | 活動列表/新增 |
| GET/PUT/DELETE | `/api/admin/events/[id]` | 活動詳情/更新/刪除 |
| GET/POST | `/api/admin/promotions` | 促銷列表/新增 |
| GET/PUT/DELETE | `/api/admin/promotions/[id]` | 促銷詳情/更新/刪除 |
| GET/POST | `/api/admin/content-blocks` | 內容區塊列表/新增 |
| GET/PUT/DELETE | `/api/admin/content-blocks/[key]` | 內容區塊詳情/更新/刪除 |
| GET | `/api/admin/contact-messages` | 聯絡訊息列表 |
| GET/PUT/DELETE | `/api/admin/contact-messages/[id]` | 訊息詳情/更新/刪除 |
| GET/POST | `/api/admin/settings` | 網站設定 |
| POST | `/api/admin/upload` | 圖片上傳 |

## 指令

```bash
pnpm dev          # 啟動開發伺服器
pnpm build        # 生產構建
pnpm start        # 啟動生產伺服器
pnpm lint         # 程式碼檢查
pnpm db:seed      # 導入種子數據
pnpm db:push      # 推送 Schema 到資料庫
pnpm db:studio    # 開啟 Prisma Studio
```

## 設計系統

### CSS 變數

```css
/* 主色調 - 古典酒紅（品牌主色） */
--tea-ink: #2F090C;      /* 深酒紅 - 品牌主色 */
--tea-forest: #4a1518;   /* 暗紅木 */
--tea-jade: #6b2428;     /* 赤褐 - 強調色 */
--tea-sage: #8c4a4a;     /* 淺酒紅 */
--tea-mint: #b87070;     /* 玫瑰棕 */

/* 輔助色 - 宣紙絹白 */
--silk-white: #faf8f5;
--paper-cream: #f2ede6;
--warm-sand: #e5ddd2;

/* 點綴色 - 古銅金箔 */
--terracotta: #c9a227;   /* 古銅金 */
--rust-copper: #d4b84a;  /* 淺金色 */
--deep-amber: #a07d1c;   /* 深金色 */
```

### 自訂工具類

- `.texture-ink` - 水墨紋理背景
- `.texture-paper` - 宣紙紋理
- `.brush-underline` - 毛筆下劃線效果
- `.stamp` - 印章效果
- `.animate-float` - 茶葉漂浮動畫
- `.animate-ink` - 墨暈擴散動畫
- `.font-serif` - 書法風格標題字體

## 已知限制與待完成功能

### 前台功能
- **導覽連結**：已修正為絕對路徑（`/#about` 而非 `#about`），可從任何子頁面正確跳轉到首頁對應區塊
- **社群連結**：目前連結至預設的 Instagram/Facebook 頁面（teainn.tw），需在上線前更新為實際社群連結
- **加盟說明書**：點擊後會顯示提示訊息，需上傳實際 PDF 文件至 `/public/files/franchise-guide.pdf`
- **門市地圖/線上訂購**：需在後台為各門市設定 `mapUrl` 和 `orderUrl`，否則會顯示提示訊息
- **活動圖片**：需在後台為活動上傳圖片，否則會顯示品牌風格的佔位圖

### 後台設定
在 CMS 後台可管理以下內容：
- 門市的 Google Maps 連結（mapUrl）
- 門市的線上訂購連結（orderUrl）
- 活動圖片上傳
- 社群連結（可在頁面內容中編輯 footer 區塊）

## 注意事項

### R2 圖片存儲設定

如果要使用 Cloudflare R2 存儲圖片，需要：

1. 在 Cloudflare Dashboard 建立 R2 Bucket
2. 創建 API Token（需要 R2 讀寫權限）
3. 設定公開存取（如需要）
4. 在 `.env` 填入相關憑證

如果未配置 R2，圖片將存儲在本地 `/public/uploads` 目錄。

## Vercel 部署

### 1. 連接 GitHub 倉庫

將專案推送到 GitHub，然後在 Vercel 導入專案。

### 2. 設置環境變數

在 Vercel 專案設定中添加以下環境變數：

```
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET=your-super-secret-key-change-in-production
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# Cloudflare R2（必須設定，Vercel 無法使用本地存儲）
R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
R2_BUCKET_NAME=drink
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_PUBLIC_URL=https://your-r2-public-url
```

### 3. Cloudflare R2 設定

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 進入 R2 Object Storage
3. 創建 Bucket（如果尚未創建）
4. 進入「Manage R2 API Tokens」創建 API Token
5. 選擇「Object Read & Write」權限
6. 複製 Access Key ID 和 Secret Access Key
7. 如需公開存取，設定 Bucket 的 Public Access 或使用 Custom Domain

### 4. 部署

Vercel 會自動檢測 Next.js 專案並部署。

### 5. 初始化資料庫

部署後，在本地執行種子腳本來初始化資料：

```bash
pnpm db:seed
```

### 生產環境注意事項

1. 更改 `NEXTAUTH_SECRET` 為安全的隨機字串
2. 更改管理員密碼
3. 設定正確的 `NEXTAUTH_URL`（你的 Vercel 域名）
4. 確保資料庫連接安全
5. **R2 必須正確配置**，否則圖片上傳功能無法使用
