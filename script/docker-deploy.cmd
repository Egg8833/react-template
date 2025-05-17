@echo off
chcp 65001 >nul
REM 用於在 Windows 本地建構後部署 Docker 容器的批次腳本

echo === 開始本地建構與部署 NBO 前端專案 ===

REM 檢查 Docker 是否可用
echo 檢查 Docker 是否安裝並可用中...
docker --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [錯誤] Docker 未安裝或不在 PATH 中，請先安裝 Docker。
    exit /b 1
)

REM 檢查 Docker 是否正在運行
docker info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [錯誤] Docker 未啟動，請先啟動 Docker Desktop。
    exit /b 1
) else (
    echo Docker 環境已就緒！
)

REM 處理參數
set SKIP_BUILD=false
if "%1"=="--skip-build" set SKIP_BUILD=true

REM 1. 執行本地建構
if "%SKIP_BUILD%"=="false" (
    echo.
    echo [步驟 1] 執行 pnpm build ...
    call pnpm build

    if %ERRORLEVEL% neq 0 (
        echo [錯誤] 本地建構失敗，請檢查錯誤訊息。
        exit /b 1
    )

    echo ✅ 本地建構成功！
) else (
    echo.
    echo 已跳過本地建構步驟 (--skip-build)
)

REM 2. 驗證建構產物
echo.
echo [步驟 2] 驗證建構結果...

if not exist ".\apps\nbo_adminSite\dist" (
    echo [錯誤] 找不到 '.\apps\nbo_adminSite\dist'，請確認是否成功建構。
    exit /b 1
)

if not exist ".\apps\nbo_orderingSystem\dist" (
    echo [錯誤] 找不到 '.\apps\nbo_orderingSystem\dist'，請確認是否成功建構。
    exit /b 1
)

echo ✅ 建構結果驗證成功！

REM 3. 清理現有容器與映像檔
echo.
echo [步驟 3] 清理現有的容器與映像檔...

REM 停止並移除容器
for /f "tokens=*" %%i in ('docker ps -a -q -f name^=nbo-admin') do (
    if not "%%i"=="" (
        echo 停止與移除 nbo-admin 容器...
        docker stop nbo-admin
        docker rm nbo-admin
    )
)

for /f "tokens=*" %%i in ('docker ps -a -q -f name^=nbo-ordering') do (
    if not "%%i"=="" (
        echo 停止與移除 nbo-ordering 容器...
        docker stop nbo-ordering
        docker rm nbo-ordering
    )
)

REM 移除映像檔
for /f "tokens=*" %%i in ('docker images -q nbo-admin-site:latest') do (
    if not "%%i"=="" (
        echo 移除 nbo-admin-site 映像檔...
        docker rmi -f nbo-admin-site:latest
    )
)

for /f "tokens=*" %%i in ('docker images -q nbo-ordering-system:latest') do (
    if not "%%i"=="" (
        echo 移除 nbo-ordering-system 映像檔...
        docker rmi -f nbo-ordering-system:latest
    )
)

REM 4. 建構 Docker 映像檔
echo.
echo [步驟 4] 建構 Docker 映像檔...

echo 建構 nbo-admin-site...
cd .\apps\nbo_adminSite
docker build -t nbo-admin-site:latest -f Dockerfile.local-build .
if %ERRORLEVEL% neq 0 (
    echo [錯誤] 建構 nbo-admin-site 映像檔失敗！
    cd ..\..
    exit /b 1
)
cd ..\..

echo 建構 nbo-ordering-system...
cd .\apps\nbo_orderingSystem
docker build -t nbo-ordering-system:latest -f Dockerfile.local-build .
if %ERRORLEVEL% neq 0 (
    echo [錯誤] 建構 nbo-ordering-system 映像檔失敗！
    cd ..\..
    exit /b 1
)
cd ..\..

REM 5. 啟動容器
echo.
echo [步驟 5] 啟動 Docker 容器...

echo 啟動 nbo-admin (port 8080)...
docker run -d -p 8080:80 --name nbo-admin nbo-admin-site:latest

echo 啟動 nbo-ordering (port 8081)...
docker run -d -p 8081:80 --name nbo-ordering nbo-ordering-system:latest

REM 顯示容器狀態
echo.
echo [步驟 6] 檢查容器執行狀態...
docker ps -f name=nbo-admin -f name=nbo-ordering

REM 顯示完成訊息
echo.
echo === ✅ 部署完成！ ===
echo 管理員後台：http://localhost:8080
echo 訂單系統：http://localhost:8081
echo.
echo 💡 提示：可執行下列指令關閉容器：
echo     docker stop nbo-admin nbo-ordering
