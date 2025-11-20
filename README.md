# 个人网站项目

一个使用 React + Vite 构建的现代化个人网站，展示专业技能、项目经验和作品集。

## 技术栈

- **React 18** - 前端框架
- **React Router** - 路由管理
- **Vite** - 构建工具
- **CSS3** - 样式设计（响应式布局）

## 项目结构

```
├── public/
│   ├── images/          # 图片资源
│   ├── videos/          # 视频资源
│   └── *.pdf            # PDF 文件
├── src/
│   ├── components/      # 通用组件
│   │   ├── Navbar.jsx   # 导航栏
│   │   └── Navbar.css
│   ├── pages/           # 页面组件
│   │   ├── Home.jsx     # 首页
│   │   ├── About.jsx    # 关于我
│   │   ├── Projects.jsx # 项目经验
│   │   ├── Awards.jsx   # 荣誉奖项
│   │   ├── Skills.jsx   # 技能矩阵
│   │   └── Contact.jsx  # 联系与简历
│   ├── App.jsx          # 主应用组件
│   ├── App.css
│   ├── main.jsx         # 入口文件
│   └── index.css        # 全局样式
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 资源文件

项目所需的图片和视频资源请放置在 `public/` 目录下：
- `public/images/` - 图片资源
- `public/videos/` - 视频资源

建议图片使用 WebP 格式以优化加载速度。

## 功能特性

- ✅ 响应式设计（PC/平板/移动端适配）
- ✅ 图片懒加载和占位符
- ✅ 图片点击放大功能
- ✅ 视频播放控制
- ✅ 平滑滚动动画
- ✅ 移动端汉堡菜单
- ✅ PDF 简历下载
- ✅ 社交媒体链接

## 浏览器兼容性

- Chrome（最新3个版本）
- Firefox（最新3个版本）
- Safari（最新3个版本）
- Edge（最新3个版本）

## 性能优化

- 图片使用 WebP 格式（体积减少50%）
- 图片懒加载
- 视频点击播放（避免自动加载）
- CSS 代码分割
- Vite 生产构建优化

## 部署到公网

### GitHub Pages 部署（推荐）

本项目已配置好 GitHub Pages 自动部署，按照以下步骤操作：

#### 方法一：使用 GitHub Actions（自动部署，推荐）

1. **确保仓库已推送到 GitHub**
   ```bash
   git add .
   git commit -m "准备部署到 GitHub Pages"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入 GitHub 仓库页面
   - 点击 `Settings` → `Pages`
   - 在 `Source` 部分选择 `GitHub Actions`
   - 保存设置

3. **触发部署**
   - 推送代码到 `main` 分支会自动触发部署
   - 或手动触发：在 `Actions` 标签页选择 `Deploy to GitHub Pages` 工作流，点击 `Run workflow`

4. **访问网站**
   - 部署完成后，访问：`https://你的用户名.github.io/Astwea_SelfWeb/`
   - 首次部署可能需要几分钟，后续更新会自动部署

#### 方法二：使用 gh-pages 手动部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到 GitHub Pages**
   ```bash
   npm run deploy
   ```

   这会自动将 `dist` 目录的内容推送到 `gh-pages` 分支。

3. **配置 GitHub Pages**
   - 进入 GitHub 仓库的 `Settings` → `Pages`
   - 在 `Source` 部分选择 `Deploy from a branch`
   - 选择 `gh-pages` 分支和 `/ (root)` 目录
   - 保存设置

#### 注意事项

- **仓库名称**：如果仓库名称不是 `Astwea_SelfWeb`，需要修改 `vite.config.js` 中的 `base` 配置
- **路由问题**：已配置 `404.html` 处理 SPA 路由，确保所有路由都能正常访问
- **自定义域名**：如需使用自定义域名，在 `Settings` → `Pages` → `Custom domain` 中配置

### 其他部署方式

**使用 Vercel（最简单）**：
1. 将代码推送到 GitHub
2. 访问 https://vercel.com 并登录
3. 导入项目 → 选择仓库 → 自动部署
4. 5 分钟后获得 `https://your-project.vercel.app` 网址

**使用 Netlify**：
1. 访问 https://www.netlify.com
2. 拖拽 `dist` 文件夹到页面，或连接 GitHub 仓库自动部署

### 详细部署指南

查看 [部署指南.md](./部署指南.md) 了解完整的部署方案，包括：
- Vercel 部署
- Netlify 部署
- GitHub Pages 部署（已配置）
- 云服务器部署
- 其他托管服务

### 构建生产版本

```bash
npm run build
```

构建后的文件在 `dist` 目录，可以直接部署到任何静态网站托管服务。

## 相关链接

- 在线演示：https://astwea.github.io/Astwea_SelfWeb/
- GitHub：https://github.com/Astwea
- LinkedIn：https://www.linkedin.com/in/linsen733

## 贡献

欢迎提交 Issue 和 Pull Request！

## 开发

这是一个开源项目，你可以：
1. Fork 本项目
2. 创建你的特性分支
3. 提交你的更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
