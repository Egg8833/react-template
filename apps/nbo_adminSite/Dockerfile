# 第一階段：使用 Node.js 22.14.0 來建置 React 應用
FROM node:22.14.0-alpine AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json
COPY package.json  package-lock.json  ./

# 安裝依賴
RUN npm install

# 複製專案所有檔案
COPY . .

# 建置 React 應用（產生 dist/ 目錄）
RUN npm run build

# ----------------------------------------------

# 第二階段：使用 Nginx 來提供靜態網站
FROM nginx:alpine

# 設定工作目錄
WORKDIR /usr/share/nginx/html

# 刪除 Nginx 預設的 index.html
RUN rm -rf ./*

# 複製 React 打包後的 dist 目錄到 Nginx
COPY --from=builder /app/dist .

# 複製自訂的 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 開放 Nginx 80 端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
