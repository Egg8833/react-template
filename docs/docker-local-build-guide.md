# Docker 本地建構部署流程

本文檔說明如何使用本地建構結果來建立並部署 Docker 容器，相較於直接在 Docker 容器內建構的方式，這種方法更快速且容易偵錯。

## 部署流程概述

1. **本地建構**：在本地環境使用 pnpm 建構所有應用
2. **驗證建構**：確認 dist 目錄已經建立並包含所有必要檔案
3. **建構映像檔**：使用本地建構結果建立 Docker 映像檔
4. **部署容器**：啟動 Docker 容器

## 使用方式

### 一步執行 (建構 + 部署)

```bash
# 在打包之前 先安裝
pnpm install

# Linux/macOS
pnpm docker:deploy

# Windows
pnpm docker:deploy:win
```

### 僅部署 (跳過建構)

當已經完成本地建構後，可以使用這些命令跳過建構步驟：

```bash
# Linux/macOS
pnpm docker:deploy:skip-build

# Windows
pnpm docker:deploy:win:skip-build
```

### 停止容器

```bash
pnpm docker:stop
```

## Dockerfile 說明

我們使用簡化版的 Dockerfile 來部署本地建構結果：

```dockerfile
# 使用簡單的 Nginx 映像檔
FROM nginx:alpine

# 設定工作目錄
WORKDIR /usr/share/nginx/html

# 刪除 Nginx 預設的 index.html
RUN rm -rf ./*

# 複製已經在本地建構好的 dist 目錄到 Nginx
COPY ./dist .

# 複製自訂的 Nginx 配置
COPY ./nginx.conf /etc/nginx/nginx.conf

# 開放 Nginx 80 端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
```

## 優勢

1. **更快速的部署流程**：避免在容器中重複安裝相依套件
2. **更好的錯誤處理**：在本地環境容易診斷和修復建構問題
3. **更小的映像檔**：最終的 Docker 映像檔僅包含運行時環境
4. **更好的資源利用**：減少容器建構期間的記憶體和 CPU 使用

## 部署專用分支 (deploy-linux)

本專案使用固定的 `deploy-linux` 分支處理所有生產環境的部署工作。此分支只包含部署所需的必要檔案：

- 已建構好的應用程式（dist 目錄）
- Nginx 配置
- Docker 部署腳本
- 精簡版的 package.json

### 更新部署分支

當需要部署新版本時，請按照以下步驟更新部署分支：

```bash
# 1. 先在主分支上確保應用程式已建構成功
pnpm build

# 2. 產生部署資料夾
pnpm deploy:linux
```

此腳本會自動產生一個名為 `deploy-linux` 的資料夾，其中只包含部署所需的檔案，保持部署環境的精簡和專注。

在 Linux 生產伺服器上，只需將產生的 `deploy-linux` 資料夾複製到伺服器上，然後執行部署命令即可。
