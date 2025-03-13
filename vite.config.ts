import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// import UnoCSS from 'unocss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // UnoCSS(),
    react(),
  ],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 設定 @ 為 src 目錄
    },
  },
})
