@echo off
chcp 65001 >nul
REM 建立部署專用分支的腳本
REM 此腳本會建立一個新的分支，只保留部署到 Linux 環境所需的檔案

echo === 建立部署專用分支 ===

REM 檢查 git 是否可用
echo 檢查 git 是否安裝...
git --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [錯誤] git 未安裝或不在 PATH 中，請先安裝 git。
    exit /b 1
)

REM 確認當前目錄是否為 git 倉庫
if not exist ".git" (
    echo [錯誤] 請在 git 倉庫根目錄執行此腳本。
    exit /b 1
)

REM 檢查是否有未提交的變更
git diff-index --quiet HEAD -- >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [警告] 有未提交的變更，建議先提交或暫存這些變更。
    set /p CONTINUE=是否繼續? (y/n): 
    if /i not "%CONTINUE%"=="y" (
        exit /b 1
    )
)

REM 獲取當前分支名稱
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%i
echo 當前分支: %CURRENT_BRANCH%

REM 建立新的部署分支名稱
for /f "tokens=*" %%i in ('date /t') do set TODAY=%%i
set DEPLOY_BRANCH=deployment-%date:~0,4%%date:~5,2%%date:~8,2%
echo 將建立新的部署分支: %DEPLOY_BRANCH%

REM 確認用戶是否想繼續
set /p CONTINUE=是否繼續建立部署分支? (y/n): 
if /i not "%CONTINUE%"=="y" (
    echo 操作已取消。
    exit /b 0
)

REM 建立新的部署分支
echo 建立新的部署分支...
git checkout -b %DEPLOY_BRANCH%

REM 建構應用程序
echo 執行建構...
call pnpm install
call pnpm build

REM 建立臨時目錄，用於保存需要保留的文件
echo 準備保留必要文件...
if not exist "%TEMP%\deployment-files" mkdir "%TEMP%\deployment-files"

REM 複製需要保留的文件到臨時目錄
echo 複製部署必要文件...
xcopy /s /i /y apps\nbo_adminSite\dist "%TEMP%\deployment-files\admin-dist"
xcopy /s /i /y apps\nbo_orderingSystem\dist "%TEMP%\deployment-files\ordering-dist"
copy /y script\docker-deploy.sh "%TEMP%\deployment-files\"
copy /y script\Dockerfile.template "%TEMP%\deployment-files\"
copy /y apps\nbo_adminSite\nginx.conf "%TEMP%\deployment-files\admin-nginx.conf"
copy /y apps\nbo_orderingSystem\nginx.conf "%TEMP%\deployment-files\ordering-nginx.conf"

REM 清空當前目錄（除了.git）
echo 清空非必要文件...
for /d %%i in (*) do if not "%%i"==".git" rmdir /s /q %%i
for %%i in (*) do if not "%%i"=="README.md" del /q %%i

REM 創建必要的目錄結構
echo 重建目錄結構...
mkdir apps\nbo_adminSite
mkdir apps\nbo_orderingSystem
mkdir script

REM 從臨時目錄複製文件回來
echo 還原必要文件...
xcopy /s /i /y "%TEMP%\deployment-files\admin-dist" apps\nbo_adminSite\dist
xcopy /s /i /y "%TEMP%\deployment-files\ordering-dist" apps\nbo_orderingSystem\dist
copy /y "%TEMP%\deployment-files\docker-deploy.sh" script\
copy /y "%TEMP%\deployment-files\Dockerfile.template" script\
copy /y "%TEMP%\deployment-files\admin-nginx.conf" apps\nbo_adminSite\nginx.conf
copy /y "%TEMP%\deployment-files\ordering-nginx.conf" apps\nbo_orderingSystem\nginx.conf

REM 創建簡化版的 package.json
echo 創建簡化版 package.json...
(
    echo {
    echo   "name": "nbo-frontend-deployment",
    echo   "private": true,
    echo   "version": "1.0.0",
    echo   "scripts": {
    echo     "deploy": "bash ./script/docker-deploy.sh --skip-build",
    echo     "stop": "docker stop nbo-admin nbo-ordering"
    echo   }
    echo }
) > package.json

REM 創建說明文件
echo 創建部署說明文件...
(
    echo # NBO 前端部署包
    echo.
    echo 此分支只包含部署所需的檔案，用於 Linux 環境的生產部署。
    echo.
    echo ## 檔案結構
    echo.
    echo ```
    echo ./
    echo ├── apps/
    echo │   ├── nbo_adminSite/
    echo │   │   ├── dist/          # 管理員後台建構結果
    echo │   │   └── nginx.conf     # Nginx 配置
    echo │   └── nbo_orderingSystem/
    echo │       ├── dist/          # 訂單系統建構結果
    echo │       └── nginx.conf     # Nginx 配置
    echo │
    echo ├── script/
    echo │   ├── docker-deploy.sh   # Docker 部署腳本
    echo │   └── Dockerfile.template # Docker 檔案範本
    echo │
    echo ├── package.json           # 簡化版套件設定
    echo └── README.md              # 說明文件
    echo ```
    echo.
    echo ## 部署指令
    echo.
    echo ```bash
    echo # 部署容器
    echo npm run deploy
    echo.
    echo # 停止容器
    echo npm run stop
    echo ```
    echo.
    echo ## 注意事項
    echo.
    echo 1. 此分支僅包含部署所需的檔案，不包含原始碼
    echo 2. 建構結果已包含在 `dist` 目錄中，不需要重新建構
    echo 3. 此分支適合在 Linux 伺服器上使用，不適合開發環境
) > README.md

REM 清理臨時目錄
rmdir /s /q "%TEMP%\deployment-files"

REM 提交變更
echo 提交變更...
git add .
git commit -m "建立簡化版部署分支，只包含部署所需檔案"

echo 部署分支 %DEPLOY_BRANCH% 已建立成功！
echo 部署分支包含以下文件:
dir /s /b /a-d | findstr /v "\.git"

echo.
echo 注意:
echo 1. 使用 'git push origin %DEPLOY_BRANCH%' 將此分支推送到遠程倉庫
echo 2. 在 Linux 伺服器上使用 'git clone --branch %DEPLOY_BRANCH% --single-branch ^<repository-url^>' 來下載部署分支
echo 3. 然後在伺服器上執行 'npm run deploy' 來部署容器
echo 4. 若要返回開發分支，請執行 'git checkout %CURRENT_BRANCH%'
