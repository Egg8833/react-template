import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  base: './',
  plugins: [UnoCSS(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@nbo/src': path.resolve(__dirname, '../../packages/src'),
    },
  },  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React 相關
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // MUI 核心組件
          if (id.includes('node_modules/@mui/material')) {
            return 'vendor-mui-core';
          }
          // MUI Icons 分離
          if (id.includes('node_modules/@mui/icons-material')) {
            return 'vendor-mui-icons';
          }
          // MUI Data Grid 分離
          if (id.includes('node_modules/@mui/x-data-grid')) {
            return 'vendor-mui-datagrid';
          }
          // MUI System
          if (id.includes('node_modules/@mui/system')) {
            return 'vendor-mui-system';
          }
          // 其他工具庫
          if (id.includes('node_modules/axios') || 
              id.includes('node_modules/react-router') || 
              id.includes('node_modules/zustand')) {
            return 'vendor-utils';
          }
          // 其他 node_modules
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        }
      }
    }
  },
  server: {},
  preview: {},
})
