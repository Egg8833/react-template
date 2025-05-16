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
    },
  },
  server: {},
  preview: {},
})
