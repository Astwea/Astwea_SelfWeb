import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/SelfWeb/', // GitHub Pages 部署路径，如果仓库名是 username.github.io 则改为 '/'
  server: {
    port: 3000,
    open: true
  }
})
