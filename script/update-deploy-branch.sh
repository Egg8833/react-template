#!/bin/bash
# 更新 deploy-linux 部署分支的腳本
# 此腳本會更新 deploy-linux 分支，只保留部署到 Linux 環境所需的檔案

set -e

YELLOW='\033[1;33m'
CYAN='\033[1;36m'
GREEN='\033[1;32m'
RED='\033[1;31m'
NC='\033[0m'

# 確認 git 是否可用
echo -e "${CYAN}檢查 git 是否安裝...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}錯誤: git 未安裝或不在 PATH 中。請先安裝 git。${NC}"
    exit 1
fi

# 確認當前目錄是否為 git 倉庫
if [ ! -d ".git" ]; then
    echo -e "${RED}錯誤: 請在 git 倉庫根目錄執行此腳本。${NC}"
    exit 1
fi

# 檢查是否有未提交的變更
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}警告: 有未提交的變更，建議先提交或暫存這些變更。${NC}"
    read -p "是否繼續? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 獲取當前分支名稱
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${CYAN}當前分支: ${CURRENT_BRANCH}${NC}"

# 目標部署分支名稱
DEPLOY_BRANCH="deploy-linux"

# 確保建構結果存在
if [ ! -d "./apps/nbo_adminSite/dist" ] || [ ! -d "./apps/nbo_orderingSystem/dist" ]; then
    echo -e "${RED}錯誤: 建構結果未找到。請先執行 'pnpm build' 確保應用程式已建構。${NC}"
    exit 1
fi

# 確認用戶是否想繼續
echo -e "${YELLOW}此操作將更新 ${DEPLOY_BRANCH} 分支，只保留部署所需的檔案。${NC}"
read -p "是否繼續? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${CYAN}操作已取消。${NC}"
    exit 0
fi

# 檢查 deploy-linux 分支是否已存在
if git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
    echo -e "${CYAN}${DEPLOY_BRANCH} 分支已存在，將進行更新...${NC}"
    # 保存當前工作目錄
    git stash -u

    # 切換到部署分支
    git checkout $DEPLOY_BRANCH
    
    # 確認是否成功切換到部署分支
    if [ "$(git rev-parse --abbrev-ref HEAD)" != "$DEPLOY_BRANCH" ]; then
        echo -e "${RED}錯誤: 無法切換到 ${DEPLOY_BRANCH} 分支。${NC}"
        git checkout $CURRENT_BRANCH
        git stash pop
        exit 1
    fi

    # 切回當前分支以準備更新
    git checkout $CURRENT_BRANCH
    git stash pop
else
    echo -e "${CYAN}${DEPLOY_BRANCH} 分支不存在，將建立新的部署分支...${NC}"
fi

# 建立臨時目錄，用於保存需要保留的文件
echo -e "${CYAN}準備保留必要文件...${NC}"
mkdir -p /tmp/deployment-files

# 複製需要保留的文件到臨時目錄
echo -e "${CYAN}複製部署必要文件...${NC}"

# 複製應用程序的建構結果
cp -r apps/nbo_adminSite/dist /tmp/deployment-files/admin-dist
cp -r apps/nbo_orderingSystem/dist /tmp/deployment-files/ordering-dist

# 複製部署腳本和配置文件
cp -r script/docker-deploy.sh /tmp/deployment-files/
cp -r script/Dockerfile.template /tmp/deployment-files/
cp -r apps/nbo_adminSite/nginx.conf /tmp/deployment-files/admin-nginx.conf
cp -r apps/nbo_orderingSystem/nginx.conf /tmp/deployment-files/ordering-nginx.conf

# 保存當前分支
git stash -u

# 如果 deploy-linux 分支存在，就切換到它；否則，建立它
if git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
    git checkout $DEPLOY_BRANCH
else
    git checkout --orphan $DEPLOY_BRANCH
    # 必須先清空目錄，以免之前的舊文件存在
    git rm -rf .
fi

# 清空當前目錄（此時應該已經在 deploy-linux 分支上）
find . -mindepth 1 -not -path "./.git*" -delete 2>/dev/null || true

# 創建必要的目錄結構
echo -e "${CYAN}重建目錄結構...${NC}"
mkdir -p apps/nbo_adminSite
mkdir -p apps/nbo_orderingSystem
mkdir -p script

# 從臨時目錄複製文件回來
echo -e "${CYAN}還原必要文件...${NC}"
cp -r /tmp/deployment-files/admin-dist apps/nbo_adminSite/dist
cp -r /tmp/deployment-files/ordering-dist apps/nbo_orderingSystem/dist
cp -r /tmp/deployment-files/docker-deploy.sh script/
cp -r /tmp/deployment-files/Dockerfile.template script/
cp -r /tmp/deployment-files/admin-nginx.conf apps/nbo_adminSite/nginx.conf
cp -r /tmp/deployment-files/ordering-nginx.conf apps/nbo_orderingSystem/nginx.conf

# 創建簡化版的 package.json
echo -e "${CYAN}創建簡化版 package.json...${NC}"
cat > package.json <<EOL
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
cat > README.md <<EOL
# NBO 前端部署包

此分支只包含部署所需的檔案，用於 Linux 環境的生產部署。

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
│   ├── docker-deploy.sh   # Docker 部署腳本
│   └── Dockerfile.template # Docker 檔案範本
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

1. 此分支僅包含部署所需的檔案，不包含原始碼
2. 建構結果已包含在 \`dist\` 目錄中，不需要重新建構
3. 此分支專門用於 Linux 生產伺服器
EOL

# 清理臨時目錄
rm -rf /tmp/deployment-files

# 提交變更
echo -e "${CYAN}提交變更...${NC}"
git add .
git commit -m "更新部署檔案 (${VERSION})" || echo "No changes to commit"

# 顯示完成訊息
echo -e "${GREEN}部署分支 ${DEPLOY_BRANCH} 已更新成功！${NC}"
echo -e "${CYAN}部署分支包含以下文件:${NC}"
find . -type f -not -path "./.git*" | sort

echo -e "\n${YELLOW}注意:${NC}"
echo -e "1. 使用 'git push origin ${DEPLOY_BRANCH}' 將部署分支推送到遠程倉庫"
echo -e "2. 在 Linux 伺服器上使用 'git pull' 更新部署分支"
echo -e "3. 然後執行 'npm run deploy' 來部署容器"
echo -e "4. 現在切換回開發分支: 'git checkout ${CURRENT_BRANCH}'"

# 切換回原本的分支
git checkout $CURRENT_BRANCH
git stash pop || echo "No stash to pop"
