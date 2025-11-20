# GitHub Pages 部署步骤

## 🚀 快速开始（3 步完成）

1. **确保代码已推送到 GitHub**
   ```bash
   git add .
   git commit -m "准备部署"
   git push
   ```

2. **执行部署命令**
   ```bash
   npm run deploy
   ```

3. **在 GitHub 启用 Pages**
   - 打开 https://github.com/Astwea/SelfWeb/settings/pages
   - Source 选择：`gh-pages` 分支
   - 点击 Save

4. **访问网站**
   - 等待 1-2 分钟
   - 访问：**https://astwea.github.io/SelfWeb/**

---

## 前置条件

✅ 已安装 `gh-pages` 包  
✅ 已配置 `package.json` 的 deploy 脚本  
✅ 已配置 `vite.config.js` 的 base 路径  
✅ 已配置自动生成 404.html（用于路由支持）

## 详细部署步骤

### 1. 确保代码已提交到 GitHub

```bash
# 如果还没有初始化 Git
git init
git add .
git commit -m "Initial commit"

# 如果还没有添加远程仓库
git remote add origin https://github.com/Astwea/SelfWeb.git

# 推送到 GitHub
git push -u origin main
```

### 2. 执行部署命令

```bash
npm run deploy
```

这个命令会：
- 自动构建项目（`npm run build`）
- 将 `dist` 目录部署到 `gh-pages` 分支

### 3. 在 GitHub 上启用 Pages

1. 打开你的 GitHub 仓库：https://github.com/Astwea/SelfWeb
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**（页面）
4. 在 **Source**（源）部分：
   - 选择分支：`gh-pages`
   - 选择文件夹：`/ (root)`
5. 点击 **Save**（保存）

### 4. 访问你的网站

等待几分钟后，你的网站将在以下地址可用：

**https://astwea.github.io/SelfWeb/**

> ⚠️ 注意：如果仓库名是 `username.github.io`（例如 `Astwea.github.io`），则访问地址是 `https://astwea.github.io/`（不需要仓库名）

## 后续更新

每次更新网站后，只需运行：

```bash
npm run deploy
```

然后等待几分钟，GitHub Pages 会自动更新。

## 常见问题

### 1. 如果仓库名是 `username.github.io`

如果你的仓库名是 `Astwea.github.io`，需要修改 `vite.config.js`：

```js
base: '/', // 改为根路径
```

访问地址将是：`https://astwea.github.io/`

### 2. 路由不工作

GitHub Pages 需要特殊配置来处理 React Router。如果遇到路由问题，可以：

**方案 A：使用 HashRouter（推荐）**

修改 `src/main.jsx`：

```jsx
import { HashRouter } from 'react-router-dom'

// 将 BrowserRouter 改为 HashRouter
<HashRouter>
  <App />
</HashRouter>
```

**方案 B：创建 404.html**

在 `public` 目录创建 `404.html`，内容与 `index.html` 相同。

### 3. 图片或资源加载失败

确保所有资源路径使用相对路径，不要使用绝对路径。

### 4. 自定义域名

如果想使用自定义域名（如 `www.yourname.com`）：

1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名：
   ```
   www.yourname.com
   ```
2. 在域名服务商添加 CNAME 记录指向 `astwea.github.io`
3. 在 GitHub Pages 设置中启用自定义域名

## 验证部署

部署成功后，可以：

1. 检查 `gh-pages` 分支是否已创建
2. 在 GitHub 仓库的 Settings → Pages 中查看部署状态
3. 访问网站地址验证是否正常显示

## 需要帮助？

如果遇到问题：
- 检查 GitHub Actions 日志（如果有）
- 查看浏览器控制台错误
- 确认所有资源路径正确
- 验证 `vite.config.js` 中的 `base` 路径是否正确

