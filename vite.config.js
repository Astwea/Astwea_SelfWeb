import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Astwea_SelfWeb/', // GitHub Pages 部署路径
  server: {
    port: 3000,
    open: true
  }
})
