# GitHub Pages 自动部署设置指南

## 问题排查步骤

### 1. 检查 GitHub Pages 设置

1. 进入你的仓库：`https://github.com/Astwea/Astwea_SelfWeb`
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**（页面）
4. 在 **Source**（源）部分，确保选择：
   - **Source**: `GitHub Actions`（不是 `Deploy from a branch`）
   - 如果显示的是分支部署，需要改为 GitHub Actions

### 2. 检查工作流是否运行

1. 点击仓库顶部的 **Actions** 标签
2. 查看是否有 "Deploy to GitHub Pages" 工作流
3. 如果工作流失败，点击查看错误日志

### 3. 手动触发部署

如果自动部署没有触发，可以手动触发：

1. 进入 **Actions** 标签
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 **Run workflow** 按钮
4. 选择 `main` 分支，点击 **Run workflow**

### 4. 检查部署状态

部署完成后：
- 工作流会显示绿色 ✓ 表示成功
- 在 **Settings > Pages** 中可以看到部署的 URL
- 通常 URL 是：`https://astwea.github.io/Astwea_SelfWeb/`

### 5. 常见问题

#### 问题：工作流没有自动运行
**解决方案**：
- 确保代码已推送到 `main` 分支
- 检查 `.github/workflows/deploy.yml` 文件是否存在
- 确保 GitHub Pages 源设置为 `GitHub Actions`

#### 问题：部署成功但页面没有更新
**解决方案**：
- 清除浏览器缓存（Ctrl+F5 或 Cmd+Shift+R）
- 等待几分钟让 CDN 更新
- 检查 `vite.config.js` 中的 `base` 路径是否正确：`/Astwea_SelfWeb/`

#### 问题：404 错误
**解决方案**：
- 确保 `vite.config.js` 中的 `base` 路径与仓库名匹配
- 检查 `dist` 目录中是否有 `404.html` 文件
- 确保路由配置正确

### 6. 验证配置

运行以下命令检查配置：

```bash
# 检查分支
git branch --show-current

# 检查工作流文件是否存在
ls -la .github/workflows/

# 构建并测试
npm run build
```

### 7. 推送代码触发部署

每次推送代码到 `main` 分支时，GitHub Actions 会自动：
1. 检出代码
2. 安装依赖
3. 构建项目
4. 部署到 GitHub Pages

```bash
git add .
git commit -m "更新内容"
git push origin main
```

推送后，在 **Actions** 标签中可以看到部署进度。

## 注意事项

- GitHub Pages 部署通常需要 1-2 分钟
- 首次部署可能需要更长时间
- 如果使用自定义域名，需要额外配置 DNS
- 免费账户的 GitHub Pages 有构建时间限制

