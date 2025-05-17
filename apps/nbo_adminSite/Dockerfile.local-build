# 使用簡單的 Nginx 映像檔，不需要建構階段
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
