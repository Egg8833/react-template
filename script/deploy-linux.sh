#!/bin/bash
# 產生部署資料夾的腳本
# 此腳本會在當前目錄中建立一個 deploy-linux 資料夾，只包含部署到 Linux 環境所需的檔案

set -e

YELLOW='\033[1;33m'
CYAN='\033[1;36m'
GREEN='\033[1;32m'
RED='\033[1;31m'
NC='\033[0m'

# 目標部署資料夾名稱
DEPLOY_DIR="deploy-linux"

pnpm build


# 檢查是否已存在部署資料夾，如果有就先刪除
if [ -d "$DEPLOY_DIR" ]; then
    echo -e "${YELLOW}部署資料夾 ${DEPLOY_DIR} 已存在，將先刪除...${NC}"
    rm -rf "$DEPLOY_DIR"
fi

# 建立部署資料夾
echo -e "${CYAN}建立部署資料夾 ${DEPLOY_DIR}...${NC}"
mkdir -p "$DEPLOY_DIR"

# 建立必要的目錄結構
echo -e "${CYAN}準備部署必要文件...${NC}"

# 在部署資料夾中建立必要的目錄結構
mkdir -p "$DEPLOY_DIR/apps/nbo_adminSite"
mkdir -p "$DEPLOY_DIR/apps/nbo_orderingSystem"
mkdir -p "$DEPLOY_DIR/script"

# 複製應用程序的建構結果
echo -e "${CYAN}複製建構結果...${NC}"
cp -r apps/nbo_adminSite/dist "$DEPLOY_DIR/apps/nbo_adminSite/"
cp -r apps/nbo_orderingSystem/dist "$DEPLOY_DIR/apps/nbo_orderingSystem/"

# 複製部署腳本和配置文件
echo -e "${CYAN}複製配置文件...${NC}"
cp -r script/docker-deploy.sh "$DEPLOY_DIR/script/"

# 設定腳本執行權限
echo -e "${CYAN}設定腳本執行權限...${NC}"
chmod +x "$DEPLOY_DIR/script/docker-deploy.sh"

# 複製 Dockerfile.local-build
echo -e "${CYAN}複製 Dockerfile.local-build...${NC}"

cp -r apps/nbo_adminSite/Dockerfile.local-build "$DEPLOY_DIR/apps/nbo_adminSite/"
cp -r apps/nbo_orderingSystem/Dockerfile.local-build "$DEPLOY_DIR/apps/nbo_orderingSystem/"
echo -e "${GREEN}成功複製 Dockerfile.local-build 檔案${NC}"


# 複製 nginx 配置檔
cp -r apps/nbo_adminSite/nginx.conf "$DEPLOY_DIR/apps/nbo_adminSite/"
cp -r apps/nbo_orderingSystem/nginx.conf "$DEPLOY_DIR/apps/nbo_orderingSystem/"

# 創建簡化版的 package.json
echo -e "${CYAN}創建簡化版 package.json...${NC}"
cat > "$DEPLOY_DIR/package.json" <<EOL
{
  "name": "nbo-frontend-deployment",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "deploy": "bash ./script/docker-deploy.sh --skip-build",
    "stop": "docker stop nbo-admin nbo-ordering"
  }
}
EOL

# 創建說明文件
echo -e "${CYAN}創建部署說明文件...${NC}"
VERSION=$(date +"%Y.%m.%d")
cat > "$DEPLOY_DIR/README.md" <<EOL
# NBO 前端部署包

此資料夾只包含部署所需的檔案，用於 Linux 環境的生產部署。

## 版本

${VERSION}

## 檔案結構

\`\`\`
./
├── apps/
│   ├── nbo_adminSite/
│   │   ├── dist/          # 管理員後台建構結果
│   │   └── nginx.conf     # Nginx 配置
│   └── nbo_orderingSystem/
│       ├── dist/          # 訂單系統建構結果
│       └── nginx.conf     # Nginx 配置
│
├── script/
│   └── docker-deploy.sh   # Docker 部署腳本
│
├── package.json           # 簡化版套件設定
└── README.md              # 說明文件
\`\`\`

## 部署指令

\`\`\`bash
# 部署容器
npm run deploy

# 停止容器
npm run stop
\`\`\`

## 注意事項

1. 此資料夾僅包含部署所需的檔案，不包含原始碼
2. 建構結果已包含在 \`dist\` 目錄中，不需要重新建構
3. 此資料夾專門用於 Linux 生產伺服器
EOL

# 顯示完成訊息
echo -e "${GREEN}部署資料夾 ${DEPLOY_DIR} 已建立成功！${NC}"
echo -e "${CYAN}資料夾包含以下文件:${NC}"
find "$DEPLOY_DIR" -type f | sort

echo -e "\n${YELLOW}注意事項:${NC}"
echo -e "1. 將整個 ${DEPLOY_DIR} 資料夾複製到伺服器上"
echo -e "2. 在伺服器上進入 ${DEPLOY_DIR} 資料夾"
echo -e "3. 執行 'npm run deploy' 來部署容器"
