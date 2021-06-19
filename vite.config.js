import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const fs = require('fs');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    https: {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    },
    proxy: {
      '/api': {
        target: 'https://localhost:8888/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.js'
    }
  }
})
