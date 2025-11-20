# 林森 - 机器人开发工程师个人网站

一个现代化的个人网站项目，展示机器人开发工程师的专业技能、项目经验和职业履历。

## 技术栈

- **React 18** - 前端框架
- **React Router** - 路由管理
- **Vite** - 构建工具
- **CSS3** - 样式设计（响应式布局）

## 项目结构

```
├── public/
│   ├── images/          # 图片资源（需添加）
│   ├── videos/          # 视频资源（需添加）
│   └── 林森-机器人开发-简历.pdf  # PDF简历（需将根目录的PDF移至此目录）
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

## 需要的图片资源

请在 `public/images/` 目录下添加以下图片（所有图片建议使用 WebP 格式以优化加载速度）：

### 首页
- `profile.jpg` - 个人形象照（1080x1080，实验室背景，手持机器人模型）
- `ros2-icon.png` - ROS2 节点通信示意图（200x200）
- `stm32-icon.png` - STM32 微控制器图标（200x200）
- `award-icon.png` - 荣誉奖章图标（200x200）

### 关于我页面
- `lab-scene.jpg` - 实验室工作场景（1920x1080）
- `life-tech.jpg` - 技术兴趣照片（400x300）
- `life-cycling.jpg` - 骑行照片（400x300）
- `life-event.jpg` - 技术沙龙合影（400x300）

### 项目经验页面
- `project1-before.jpg` - 改装前扫地机器人（200x200）
- `project1-pcb.jpg` - PCB 设计截图（400x300）
- `project1-video-thumb.jpg` - 仿真视频缩略图
- `project2-car.jpg` - 智能车实物（200x200）
- `project2-vision.jpg` - 视觉识别界面（400x300）
- `project2-team.jpg` - 竞赛现场合影（200x200）
- `project3-board.jpg` - 飞控主板实物（400x300）
- `project3-code.jpg` - PID 算法代码截图（200x200）
- `project3-wiring.jpg` - 传感器接线示意图（200x200）

### 荣誉奖项页面
- `award-tencent.jpg` - 腾讯开悟公开赛证书（150x150）
- `award-target.jpg` - 目标射击国家一等奖（150x150）
- `award-quadruped.jpg` - 四足仿生国家二等奖（150x150）
- `award-smartcar.jpg` - 智能车竞赛一等奖（150x150）
- `award-ai-algo.jpg` - 人工智能算法精英大赛一等奖（150x150）

### 技能矩阵页面
- `skill-ros2.png` - ROS2 分类图标（300x150）
- `image.png` - STM32 分类图标（300x150）
- `skill-opencv.png` - OpenCV 分类图标（300x150）
- `skill-other.png` - 其他技能分类图标（300x150）

### 联系与简历页面
- `resume-cover.jpg` - 简历封面（400x550）
- `github-icon.png` - GitHub 官方图标（80x80）
- `linkedin-icon.png` - LinkedIn 官方图标（80x80）

## 视频资源

请在 `public/videos/` 目录下添加以下视频：

- `project1-sim.mp4` - Isaac Sim 仿真视频（<50MB，15秒，MP4格式）

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

## 联系方式

- 邮箱：senlin733@gmail.com
- 电话：13808136972
- GitHub：https://github.com/Astwea
- LinkedIn：https://www.linkedin.com/in/linsen733

## 许可证

MIT License
