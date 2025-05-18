# NBO 前端專案 (Monorepo)

此專案使用 pnpm 工作區管理多個相關應用，採用 monorepo 架構進行開發。

> **最後更新日期**: 2025年5月17日

## 專案簡介

此專案包含兩個主要前端應用：
- **管理員後台 (nbo_adminSite)**: 系統管理員使用的後台介面
- **訂單系統 (nbo_orderingSystem)**: 處理訂單的專用應用程式

專案採用 pnpm 工作區 (workspace) 管理，同時包含共享元件庫以提高程式碼重用。

## 環境需求

- **Node.js**: >= 18.x (建議使用 22.14.0 或更新版本)
- **pnpm**: >= 8.x (建議使用 10.11.0 或更新版本)
- **作業系統**: Windows / macOS / Linux
- **Docker**: 用於容器化部署 (選用)

> **提示**: 此專案使用 `.nvmrc` 檔案指定 Node.js 版本。如果您安裝了 nvm，可以使用 `nvm use` 命令自動切換到正確的 Node.js 版本。

## 專案架構

此專案是一個使用 pnpm 工作區 (workspace) 的 monorepo，包含以下應用：

- **nbo_adminSite** (套件名稱: `nbo_admin_site`): 管理員後台網站
- **nbo_orderingSystem** (套件名稱: `nbo_ordering_system`): 訂單處理系統
- **packages/ui**: 共享 UI 元件庫 (套件名稱: `@nbo/ui`)

> **注意**: 資料夾名稱與套件名稱略有不同，在執行指令時請使用套件名稱。

### 目錄結構

```
react-template/
├── .nvmrc                      # Node.js 版本控制檔案
├── apps/                       # 應用程式目錄
│   ├── nbo_adminSite/          # 管理員後台
│   │   ├── public/             # 靜態資源
│   │   ├── src/                # 程式碼目錄
│   │   │   ├── api/            # API 呼叫相關模組
│   │   │   ├── assets/         # 資源檔案 (圖片等)
│   │   │   ├── components/     # 元件
│   │   │   ├── constants/      # 常數定義
│   │   │   ├── hooks/          # 自定義 Hooks
│   │   │   ├── layout/         # 頁面佈局元件
│   │   │   ├── lib/            # 函式庫設定和整合
│   │   │   ├── pages/          # 頁面元件
│   │   │   ├── store/          # 狀態管理
│   │   │   ├── type/           # 型別定義
│   │   │   └── utils/          # 共用工具函式
│   │   ├── tests/              # 測試檔案
│   │   ├── Dockerfile          # Docker 設定檔
│   │   ├── index.html          # HTML 進入點
│   │   ├── tsconfig.json       # TypeScript 設定
│   │   └── vite.config.ts      # Vite 設定檔
│   │
│   └── nbo_orderingSystem/     # 訂單系統
│       ├── public/             # 靜態資源
│       ├── src/                # 程式碼目錄
│       │   ├── api/            # API 呼叫相關模組
│       │   ├── assets/         # 資源檔案 (圖片等)
│       │   ├── components/     # 元件
│       │   ├── constants/      # 常數定義
│       │   ├── hooks/          # 自定義 Hooks
│       │   ├── layout/         # 頁面佈局元件
│       │   ├── lib/            # 函式庫設定和整合
│       │   ├── pages/          # 頁面元件
│       │   ├── store/          # 狀態管理
│       │   ├── type/           # 型別定義
│       │   └── utils/          # 共用工具函式
│       ├── tests/              # 測試檔案
│       ├── Dockerfile          # Docker 設定檔
│       ├── index.html          # HTML 進入點
│       ├── tsconfig.json       # TypeScript 設定
│       └── vite.config.ts      # Vite 設定檔
│
├── packages/                   # 共享套件
│   └── ui/                     # 共享 UI 元件
│       ├── src/                # 程式碼目錄
│       │   └── index.ts        # 匯出所有元件
│       └── tsconfig.json       # TypeScript 設定
│
├── script/                     # 自動化腳本
│   ├── docker-deploy.cmd       # Windows 環境下 Docker 部署腳本
│   ├── docker-deploy.sh        # Docker 環境中建構與部署腳本
│ 
├── package.json                # 根目錄套件定義檔
└── pnpm-workspace.yaml         # pnpm 工作區設定
```

## 快速開始

### 1. 安裝必要工具

```bash
# 使用 nvm 安裝並使用專案指定的 Node.js 版本 (推薦方式)
nvm install    # 安裝 .nvmrc 中指定的 Node.js 版本 (22.14.0)
nvm use        # 切換到 .nvmrc 中指定的 Node.js 版本

# 或直接安裝 Node.js v22.14.0 (https://nodejs.org/)

# 安裝 pnpm v10.11.0
npm install -g pnpm@10.11.0
```

### 2. 安裝專案相依套件

```bash
# 複製專案
git clone <repository-url> nbo-frontend
cd nbo-frontend

# 安裝所有相依套件
pnpm install
```

### 3. 設定腳本執行權限 (Linux/macOS)

```bash
# 設定所有腳本的執行權限
pnpm setup
```

### 4. 本地開發

```bash
# 啟動管理員後台開發伺服器
pnpm dev:admin

# 啟動訂單系統開發伺服器
pnpm dev:order
```

### 5. 建構專案

```bash
# 建構單一專案
pnpm build:admin  # 建構管理員後台
pnpm build:order  # 建構訂單系統
pnpm build:ui     # 建構共享 UI 元件庫

# 建構所有專案
pnpm build      # 在所有工作區執行 build 命令
```

### 6. 預覽建構結果

```bash
# 預覽管理員後台
pnpm preview:admin

# 預覽訂單系統
pnpm preview:order
```

### 7. Docker 容器化部署

```bash
# 在 Docker 環境中建構並部署
pnpm docker:deploy

# 停止正在執行的 Docker 容器
pnpm docker:stop
```

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

## 腳本說明

此專案包含多個位於 `script/` 資料夾中的腳本，用於自動化常見工作：


### docker-deploy.sh

用於建構並部署 Docker 容器的腳本：

```bash
pnpm docker:deploy
```

執行以下操作：
1. 在本地環境建構所有前端應用
2. 驗證本地建構結果是否存在
3. 使用本地建構結果建構管理員後台 Docker 映像檔
4. 使用本地建構結果建構訂單系統 Docker 映像檔
5. 啟動 Docker 容器

如果已完成建構，可以跳過建構步驟：
```bash
pnpm docker:deploy:skip-build
```

Windows 環境下使用：
```cmd
pnpm docker:deploy:win
# 或跳過建構
pnpm docker:deploy:win:skip-build
```

部署後，可透過以下網址訪問：
- 管理員後台：http://localhost:8080
- 訂單系統：http://localhost:8081

此方式確保開發、測試和生產環境的一致性，特別適合 CI/CD 環境。

## 工作區指令說明

此專案使用 pnpm 工作區來管理多個套件。以下是執行特定工作區指令的方式：

```bash
# 在特定工作區執行指令
pnpm --filter <package-name> <command>

# 範例: 在管理員後台執行開發伺服器
pnpm --filter nbo_admin_site dev

# 範例: 在訂單系統執行測試
pnpm --filter nbo_ordering_system test

# 在所有工作區執行相同指令
pnpm -r <command>

# 範例: 在所有工作區運行測試
pnpm -r test
```

## Docker 容器說明

本專案提供 Docker 容器化部署功能，讓您可以輕鬆在任何環境中運行應用程式。

### Docker 映像檔

執行 `pnpm docker:deploy` 後，系統會建立以下 Docker 映像檔：
- `nbo-admin-site`: 管理員後台映像檔 (使用本地建構結果)
- `nbo-ordering-system`: 訂單系統映像檔 (使用本地建構結果)

與原先在 Docker 中建構的方式相比，本地建構 + Docker 容器部署的優點：

1. **建構速度更快**：避免在 Docker 容器中重新安裝所有相依套件
2. **錯誤處理更方便**：在本地建構可以更容易看到錯誤並修正
3. **資源使用更高效**：減少容器建構過程中的資源使用
4. **映像檔更小**：最終的映像檔不包含建構工具，僅包含執行環境

### 容器網路設定

容器化應用程式使用以下連接埠：
- 管理員後台: `8080` → 容器內部 `80`
- 訂單系統: `8081` → 容器內部 `80`

### 容器資源管理

Docker 容器已設定適當的資源限制，以確保在各種環境中的最佳效能。若要調整資源限制，請編輯 `docker-deploy.sh` 腳本中的相關參數。

## 常見問題與解決方案

### 1. 安裝相依套件失敗

嘗試清除 pnpm 快取後重新安裝：

```bash
pnpm store prune
pnpm install --force
```

### 2. TypeScript 型別檢查錯誤

請確保您已安裝所有相依套件，並且遵循專案的型別定義：

```bash
# 在專案根目錄執行型別檢查
npx tsc --noEmit
```

### 3. Docker 容器無法啟動

檢查連接埠是否被佔用：

```bash
# Windows
netstat -ano | findstr "8080 8081"

# Linux/macOS
netstat -tuln | grep "8080\|8081"
```

需要時，請修改 `docker-deploy.sh` 中的連接埠映射。

## 開發指南

### 程式碼風格

此專案使用 ESLint 和 Prettier 來強制程式碼風格一致性。請確保在提交程式碼前執行以下命令：

```bash
# 檢查程式碼風格
pnpm lint

# 自動修復風格問題
pnpm lint:fix
```

### 元件開發

共享元件應放置在 `packages/ui` 目錄下，並在 `index.ts` 中正確匯出。開發新元件時，請遵循以下最佳實踐：

1. 使用 TypeScript 型別定義
2. 提供完整的 Props 介面
3. 添加適當的預設值
4. 撰寫單元測試

### 專案貢獻

貢獻此專案時，請遵循以下工作流程：

1. 為您的功能或修復建立新分支
2. 實作您的更改並添加測試
3. 確保所有測試通過
4. 提交拉取請求 (PR) 供審核

### 更新部署專用分支

本專案使用固定的 `deploy-linux` 分支處理所有生產環境的部署工作。此分支只包含部署所需的必要檔案，大幅減少了不必要的檔案，特別適合在 Linux 生產環境使用。

當需要部署新版本時，可以使用我們提供的腳本更新部署分支：

```bash
# 1. 確保已經建構最新版本
pnpm build

# 2. 在 Linux/macOS 環境下執行
bash ./script/update-deploy-branch.sh

# 或在 Windows 環境下執行
.\script\update-deploy-branch.cmd
```

此腳本會：
1. 保存當前分支狀態
2. 切換到 `deploy-linux` 分支（如果不存在則建立）
3. 移除所有非部署必要的檔案（如原始碼、測試檔案等）
4. 只保留以下內容：
   - 最新建構的應用程式（dist 目錄）
   - Nginx 配置檔案
   - Docker 部署腳本
   - 精簡版的 package.json 和 README.md
5. 提交變更並返回原始分支

在 Linux 生產伺服器上，只需從遠端倉庫拉取 `deploy-linux` 分支的最新變更，然後執行 `npm run deploy` 即可部署最新版本。


