/**
 * 构建后脚本：将 index.html 复制为 404.html
 * 用于 GitHub Pages SPA 路由支持
 */
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = join(__dirname, '..', 'dist')
const indexHtml = join(distDir, 'index.html')
const notFoundHtml = join(distDir, '404.html')

if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, notFoundHtml)
  console.log('✅ 已复制 index.html 到 404.html')
} else {
  console.error('❌ 错误：找不到 dist/index.html')
  process.exit(1)
}

