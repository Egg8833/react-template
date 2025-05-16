# NBO 前端專案 (Monorepo)

此專案使用 pnpm 工作區管理多個相關應用，採用 monorepo 架構進行開發。

## 環境需求

- **Node.js**: >= 18.x (建議使用 22.14.0 或更新版本)
- **pnpm**: >= 8.x (建議使用 10.11.0 或更新版本)
- **作業系統**: Windows / macOS / Linux

## 專案架構

此專案是一個使用 pnpm 工作區 (workspace) 的 monorepo，包含以下應用：

- **nbo_adminSite** (套件名稱: `nbo_admin_site`): 管理員後台網站
- **nbo_orderingSystem** (套件名稱: `nbo_ordering_system`): 訂單處理系統

> **注意**: 資料夾名稱與套件名稱略有不同，在執行指令時請使用套件名稱。

## 快速開始

### 1. 安裝必要工具

```bash
# 安裝或更新 Node.js v22.14.0 (https://nodejs.org/)

# 安裝 pnpm v10.11.0
npm install -g pnpm@10.11.0
```

### 2. 安裝專案相依套件

```bash
# 複製專案
git clone <repository-url>
cd react-template

# 安裝所有工作區的相依套件
pnpm install
```

### 3. 啟動開發環境

```bash
# 啟動管理員網站開發伺服器
pnpm dev:admin

# 啟動訂單系統開發伺服器
pnpm dev:order
```

### 4. 建構專案

```bash
# 建構所有應用程式
pnpm build
```

## 應用程式說明

### 管理員網站 (nbo_adminSite)

管理員網站負責系統管理、資料查詢和設定等功能。

- 套件名稱: `nbo_admin_site`
- 開發伺服器: `pnpm dev:admin`
- 預設網址: http://localhost:5173/

### 訂單處理系統 (nbo_orderingSystem)

訂單處理系統負責訂單管理、處理和相關工作流程。

- 套件名稱: `nbo_ordering_system`
- 開發伺服器: `pnpm dev:order`
- 預設網址: http://localhost:5174/ (如果 5173 埠已被佔用)

## 技術棧

- **React 19**: 最新版本的 React，支援最新的功能
- **TypeScript**: 提供靜態型別檢查，提升程式碼品質
- **Vite**: 快速的開發伺服器和建構工具
- **Material-UI (v6)**: 現代化的 UI 元件庫
- **UnoCSS**: 高效的原子化 CSS 工具
- **React Hook Form + Zod**: 表單驗證和管理
- **Zustand**: 輕量級的狀態管理工具
- **React Query (TanStack Query)**: 資料請求和快取管理
- **Vitest**: 單元測試框架，支援 React 元件測試

## 工作區指令說明

| 指令 | 說明 |
| --- | --- |
| `pnpm install` | 安裝所有工作區的相依套件 |
| `pnpm dev:admin` | 啟動管理員網站的開發伺服器 |
| `pnpm dev:order` | 啟動訂單系統的開發伺服器 |
| `pnpm build` | 建構所有工作區的應用程式 |

## 常見問題解決

### 找不到相依套件

如果遇到相依套件找不到的錯誤，例如：

```
Error: The following dependencies are imported but could not be resolved:
```

可以嘗試以下解決方法：

1. 將缺少的套件安裝到根目錄：

```bash
pnpm add <package-name> -w
```

2. 確認套件名稱與資料夾名稱的對應關係：
   - 資料夾名稱: `nbo_adminSite` -> 套件名稱: `nbo_admin_site`
   - 資料夾名稱: `nbo_orderingSystem` -> 套件名稱: `nbo_ordering_system`

3. 強制重新安裝所有相依套件：

```bash
pnpm install --force
```

### 埠號已被佔用

如果預設的 5173 埠已被佔用，Vite 會自動使用下一個可用的埠號 (如 5174)。您可以在終端機輸出中查看具體的網址。

### 型別錯誤或 TypeScript 問題

如果遇到 TypeScript 型別錯誤，可以嘗試重新建構 TypeScript 專案：

```bash
# 清除 TypeScript 快取
pnpm -r exec tsc --build --clean

# 重新建構 TypeScript 專案
pnpm -r exec tsc --build
```

## 目錄結構

```
react-template/
├── apps/
│   ├── nbo_adminSite/          # 管理員網站應用 (套件名稱: nbo_admin_site)
│   │   ├── src/                # 源碼目錄
│   │   │   ├── api/            # API 相關程式碼
│   │   │   ├── assets/         # 靜態資源
│   │   │   ├── components/     # 共用元件
│   │   │   ├── constants/      # 常數定義
│   │   │   ├── hooks/          # 自訂 hooks
│   │   │   ├── layout/         # 頁面佈局
│   │   │   ├── lib/           # 函式庫設定
│   │   │   ├── pages/          # 頁面元件
│   │   │   ├── store/          # 狀態管理
│   │   │   ├── type/           # 型別定義
│   │   │   └── utils/          # 工具函式
│   │   ├── package.json        # 應用特定相依套件
│   │   └── ...
│   │
│   └── nbo_orderingSystem/     # 訂單處理系統 (套件名稱: nbo_ordering_system)
│       ├── src/                # 源碼目錄
│       │   ├── api/            # API 相關程式碼
│       │   ├── assets/         # 靜態資源
│       │   ├── components/     # 共用元件
│       │   ├── constants/      # 常數定義
│       │   ├── hooks/          # 自訂 hooks
│       │   ├── layout/         # 頁面佈局
│       │   ├── lib/           # 函式庫設定
│       │   ├── pages/          # 頁面元件
│       │   ├── store/          # 狀態管理
│       │   ├── type/           # 型別定義
│       │   └── utils/          # 工具函式
│       ├── package.json        # 應用特定相依套件
│       └── ...
│
├── src/                        # 共用源碼目錄（跨應用共用程式碼）
│   ├── pages/                  # 共用頁面元件
│   └── type/                   # 共用型別定義
│
├── package.json                # 根目錄套件設定和指令
├── pnpm-workspace.yaml         # 工作區設定
└── README.md                   # 此說明文件
```

## 開發規範

- 使用 TypeScript 撰寫所有程式碼
- 遵循元件化開發模式
- 使用 React Hook Form 和 Zod 進行表單驗證和管理
- 使用 UnoCSS 添加樣式 (與 Material-UI 配合)
- 使用 TanStack Query (React Query) 處理 API 請求
- 共用元件應放置在相應的 `components` 目錄中
- 共用型別應放置在 `type` 目錄中
- 元件命名使用 PascalCase（例如：`UserProfile.tsx`）
- 工具函式和 hooks 命名使用 camelCase（例如：`useDataFetching.ts`）
- 正確設定 import/export 路徑，避免循環相依

## 貢獻指南

1. 建立功能分支 (`git checkout -b feature/amazing-feature`)
2. 提交變更 (`git commit -m 'feat: Add some amazing feature'`) (遵循 Conventional Commits)
3. 推送到分支 (`git push origin feature/amazing-feature`)
4. 開啟 Pull Request

## 部署說明

每個應用程式目錄中都有 `deploy.sh` 腳本和 `Dockerfile`，用於建構和部署 Docker 容器。使用以下步驟部署：

```bash
# 進入應用程式目錄
cd apps/nbo_adminSite

# 執行部署腳本
./deploy.sh
```

或使用 Docker 指令手動建構和執行：

```bash
# 建構 Docker 映像檔
docker build -t nbo-admin-site .

# 執行容器
docker run -p 80:80 nbo-admin-site
```
