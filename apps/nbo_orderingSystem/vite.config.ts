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
      '@nbo/ui': path.resolve(__dirname, '../../packages/ui'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-mui': ['@mui/material', '@mui/x-data-grid', '@mui/system', '@mui/icons-material'],
          'vendor-utils': ['axios', 'react-router-dom', 'zustand']
        }
      }
    }
  },
  server: {},
  preview: {},
})
