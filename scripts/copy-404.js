import { copyFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

try {
  // 复制 index.html 到 404.html
  copyFileSync(
    join(distDir, 'index.html'),
    join(distDir, '404.html')
  );
  console.log('✅ 已创建 404.html 文件（用于 GitHub Pages 路由支持）');
} catch (error) {
  console.error('❌ 创建 404.html 失败:', error.message);
  process.exit(1);
}

