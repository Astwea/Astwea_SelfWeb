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
│   ├── images/          # 图片（x2/ 为人形机器人项目图，thumbs/ 为自动生成的缩略图）
│   ├── videos/          # 视频
│   └── 林森-机器人开发-简历.pdf
├── scripts/
│   ├── make-thumbs.py   # 生成缩略图：python3 scripts/make-thumbs.py
│   ├── make-gif.sh      # 视频转 GIF：scripts/make-gif.sh 输入.mp4 输出.gif [开始秒] [时长] [宽度] [帧率]
│   └── copy-404.js      # 构建后复制 404.html，支持 GitHub Pages 的单页路由
├── src/
│   ├── data/site.js     # ★ 全部网站内容（简介、项目、经历、技能、荣誉、生活）
│   ├── components/      # Nav 导航、Lightbox 大图查看
│   ├── pages/           # Home 单页首页、ProjectDetail 项目详情页
│   ├── utils/           # 资源路径与缩略图工具
│   ├── styles.css       # 全局样式（浅色简约风格）
│   ├── App.jsx          # 路由与锚点滚动
│   └── main.jsx
└── index.html
```

页面结构：首页为单页长滚动（简介 → 项目 → 经历 → 技能 → 荣誉 → 工作之外 → 联系），
每个项目有独立详情页 `/projects/<slug>`。旧版的 `/about`、`/skills` 等地址会自动跳到首页对应区块。

**更新内容只需要改 `src/data/site.js`**，新增图片后运行一次 `python3 scripts/make-thumbs.py`，
详见 [如何添加图片和视频.md](./如何添加图片和视频.md)。

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

## 功能特性

- 响应式设计（桌面 / 平板 / 手机），移动端折叠菜单
- 卡片与图集使用缩略图 + 懒加载，点击查看原图（支持键盘左右切换、Esc 关闭）
- 视频点击后才加载播放
- 项目详情页、上一个 / 下一个项目导航
- 简历 PDF 一键下载

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
