#!/bin/bash
# 用於在 Unix/macOS 上本地建構與部署 NBO 前端專案

set -e

YELLOW='\033[1;33m'
CYAN='\033[1;36m'
GREEN='\033[1;32m'
RED='\033[1;31m'
NC='\033[0m'

echo -e "${YELLOW}=== 開始本地建構與部署 NBO 前端專案 ===${NC}"

# 檢查 Docker 是否可用
echo -e "${CYAN}檢查 Docker 是否安裝並可用...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}錯誤: Docker 未安裝或不在 PATH 中。請先安裝 Docker。${NC}"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}錯誤: Docker 不在運行中。請先啟動 Docker 服務。${NC}"
    exit 1
else
    echo -e "${GREEN}Docker 已就緒！${NC}"
fi

# 處理參數
SKIP_BUILD=false
if [[ "$1" == "--skip-build" ]]; then
    SKIP_BUILD=true
fi

# 1. 執行本地建構
if [[ "$SKIP_BUILD" == "false" ]]; then
    echo
    echo -e "${YELLOW}== 1. 在本地執行建構 ==${NC}"
    echo -e "${CYAN}執行 pnpm build 命令...${NC}"
    pnpm build || {
        echo -e "${RED}本地建構失敗！請修正錯誤後再試。${NC}"
        exit 1
    }
    echo -e "${GREEN}本地建構成功！${NC}"
else
    echo
    echo -e "${CYAN}跳過本地建構步驟...${NC}"
fi

# 2. 驗證建構產物
echo
echo -e "${YELLOW}== 2. 驗證建構結果 ==${NC}"

if [ ! -d "./apps/nbo_adminSite/dist" ]; then
    echo -e "${RED}管理員後台建構結果未找到！${NC}"
    exit 1
fi

if [ ! -d "./apps/nbo_orderingSystem/dist" ]; then
    echo -e "${RED}訂單系統建構結果未找到！${NC}"
    exit 1
fi

echo -e "${GREEN}建構結果驗證成功！${NC}"

# 3. 清理現有的容器與映像檔
echo
echo -e "${YELLOW}== 3. 清理現有容器和映像檔 ==${NC}"

if docker ps -a -q --filter name=nbo-admin &> /dev/null; then
    echo -e "${CYAN}停止並移除管理員後台容器...${NC}"
    docker stop nbo-admin || true
    docker rm nbo-admin || true
fi

if docker ps -a -q --filter name=nbo-ordering &> /dev/null; then
    echo -e "${CYAN}停止並移除訂單系統容器...${NC}"
    docker stop nbo-ordering || true
    docker rm nbo-ordering || true
fi

if docker images -q nbo-admin-site:latest &> /dev/null; then
    echo -e "${CYAN}移除管理員後台映像檔...${NC}"
    docker rmi -f nbo-admin-site:latest || true
fi

if docker images -q nbo-ordering-system:latest &> /dev/null; then
    echo -e "${CYAN}移除訂單系統映像檔...${NC}"
    docker rmi -f nbo-ordering-system:latest || true
fi

# 4. 建構 Docker 映像檔
echo
echo -e "${YELLOW}== 4. 建構 Docker 映像檔 ==${NC}"

echo
echo -e "${CYAN}建構管理員後台 Docker 映像檔...${NC}"
cd ./apps/nbo_adminSite
docker build -t nbo-admin-site:latest -f Dockerfile.local-build . || {
    echo -e "${RED}管理員後台 Docker 映像檔建構失敗！${NC}"
    exit 1
}
cd - > /dev/null

echo
echo -e "${CYAN}建構訂單系統 Docker 映像檔...${NC}"
cd ./apps/nbo_orderingSystem
docker build -t nbo-ordering-system:latest -f Dockerfile.local-build . || {
    echo -e "${RED}訂單系統 Docker 映像檔建構失敗！${NC}"
    exit 1
}
cd - > /dev/null

# 5. 啟動 Docker 容器
echo
echo -e "${YELLOW}== 5. 啟動 Docker 容器 ==${NC}"

echo
echo -e "${CYAN}啟動管理員後台容器 (連接埠 8080)...${NC}"
docker run -d -p 8080:80 --name nbo-admin nbo-admin-site:latest

echo
echo -e "${CYAN}啟動訂單系統容器 (連接埠 8081)...${NC}"
docker run -d -p 8081:80 --name nbo-ordering nbo-ordering-system:latest

echo
echo -e "${YELLOW}== 6. 檢查容器狀態 ==${NC}"
docker ps --filter name=nbo-admin --filter name=nbo-ordering

# 結尾提示
echo
echo -e "${GREEN}=== 部署完成！ ===${NC}"
echo -e "${CYAN}管理員後台網址：http://localhost:8080${NC}"
echo -e "${CYAN}訂單系統網址：http://localhost:8081${NC}"
echo
echo -e "${YELLOW}提示：完成測試後，可執行 'docker stop nbo-admin nbo-ordering' 來停止容器${NC}"
