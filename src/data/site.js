/**
 * 网站全部内容都在这个文件里。
 * 更新经历、项目、技能或荣誉时只需要改这里，页面会自动跟着变。
 * 图片 / 视频放在 public/ 下，这里写以 / 开头的路径（会自动加上 GitHub Pages 的 base path）。
 */

export const profile = {
  name: '林森',
  title: '机器人运动控制算法工程师',
  intro:
    '专注人形机器人全身运动控制：从动作数据、强化学习训练到 C++ 真机部署。目前在中科中成机器人负责 X2 人形机器人的全身动作跟踪、复杂地形行走与真机落地。',
  focus: ['强化学习', '人形全身控制', 'Sim2Real', 'C++ 真机部署'],
  photo: '/images/profile.jpg',
  resume: '/林森-机器人开发-简历.pdf',
  resumeCover: '/images/resume-cover.png',
  email: 'senlin733@gmail.com',
  phone: '13808136972',
  wechat: 'linsn_as',
  github: 'https://github.com/Astwea',
  updated: '2026.11',
}

export const navItems = [
  { id: 'projects', label: '项目' },
  { id: 'experience', label: '经历' },
  { id: 'skills', label: '技能' },
  { id: 'awards', label: '荣誉' },
  { id: 'contact', label: '联系' },
]

/**
 * 项目字段说明：
 * - cover：卡片封面；gif：可选动图，有的话详情页顶部优先展示
 * - images：详情页图集 [{ src, caption }]；video：可选 { src, poster }
 * - highlights：首页精选卡片上的三条亮点（只有 featured 项目需要）
 */
export const projects = [
  {
    slug: 'x2-whole-body',
    featured: true,
    title: 'X2 人形机器人全身运动控制与真机部署',
    short: '31 自由度人形机器人的全身动作跟踪策略，从数据、训练、评估到 C++ 真机部署全链路。',
    period: '2026.06 – 至今',
    org: '中科中成机器人',
    role: '运控算法工程师',
    cover: '/images/x2/dance.jpg',
    gif: null,
    tags: ['Isaac Lab', 'PPO / DAgger', 'MuJoCo', 'Sim2Real', 'C++ / ROS2', 'ONNX Runtime'],
    highlights: [
      '真机动作切换约 150 次零摔倒，6 秒内连续左右切换 26 次仍稳定',
      '舞蹈模式真机连续表演约 4 分钟、切换 20 余次无停机',
      'C++ 实时控制器：50 Hz 策略推理 / 500 Hz 指令下发，零漏拍',
    ],
    summary:
      '面向 31 自由度的 X2 Ultra 人形机器人，研发可用于遥操作和动作展示的全身动作跟踪策略。我负责从动作数据处理、强化学习训练、统一评估到 C++ 真机部署的完整链路，并在真机上实现了动作连续切换和手柄舞蹈模式。',
    responsibilities: [
      '基于 Isaac Lab / ProtoMotions 搭建全身动作模仿训练框架，主导多代策略结构迭代（分组残差、专家路由、历史编码 + Cross-Attention 等）',
      '建立统一评估体系：固定动作集、理想 / 真实条件双口径、ONNX 一致性校验，用于判断模型能否上真机',
      'Sim2Real：通过扫频辨识发现真机踝关节共振，把部署滤波和执行器特性纳入训练；按实测延迟校准时序扰动后，行走和跑步的跟踪明显改善',
      '数据驱动排查：定位落地过重的根因在参考动作本身（大量人类步态 X2 无法完成），开发落脚可行性修正工具，真机后退走不再补步',
      '大规模动作数据：调优官方 SOMA 重定向并迭代去穿模算法，完成十万级动作的重定向与清洗，训练数据规模扩大数倍',
      '开发 C++ 实时控制器与完整安全机制，实现随时打断、从最近姿态切入的动作切换，以及手柄舞蹈模式',
      '训练在线动作过渡生成模型，让动作之间的衔接更短更顺，离线预计算后在机器人上查表执行',
      '复现前沿方法 SuperMimic（可微世界模型 + 解析梯度），单卡结果超过论文，并移植到 X2',
    ],
    result:
      '首轮真机测试 7 段动作零摔倒；动作切换真机约 150 次零摔倒；舞蹈模式真机连续表演约 4 分钟无停机。',
    images: [
      { src: '/images/x2/dance.jpg', caption: '仿真中的舞蹈动作跟踪：左为参考动作，右为策略闭环' },
    ],
  },
  {
    slug: 'x2-terrain',
    title: 'X2 复杂地形感知行走',
    short: '高程图感知 + 对抗运动先验 + GRU，让人形机器人走上楼梯、斜坡和平台。',
    period: '2026.10 – 至今',
    org: '中科中成机器人',
    role: '运控算法工程师',
    cover: '/images/x2/stairs.jpg',
    tags: ['Isaac Lab', '高程图', 'WGAN-GP', 'GRU', 'Curriculum Learning'],
    summary:
      '让 X2 人形机器人借助高程图感知通过台阶、斜坡、平台边缘、断沟等复杂地形，同时保持接近人类的自然步态。',
    responsibilities: [
      '基于高程图感知 + 对抗运动先验（WGAN-GP 判别器）+ GRU 记忆网络训练复杂地形行走策略',
      '诊断长训验收失败的多个根因：地形课程退化到最低难度、“站着不动更划算”的奖励漏洞、关节动作长期被截断',
      '通过逐帧分析和对照实验排除“力量不足”的假设，定位真正原因是直腿碎步、抬脚过低',
      '加入上楼梯参考动作、低台阶课程、静止起步训练和航向保持奖励，逐项修复失败模式',
    ],
    result: '首次在仿真中稳定爬上评测楼梯，楼梯、斜坡、平台边缘和平地全部通过。',
    images: [
      { src: '/images/x2/stairs.jpg', caption: '仿真中爬楼梯，右上角为策略实际看到的高程图' },
    ],
  },
  {
    slug: 'motion-studio',
    title: '机器人动作时序编排与仿真验证软件',
    short: '像剪辑视频一样编排机器人动作，在数字孪生里预演后再下发，已申请软著。',
    period: '2026.07 – 至今',
    org: '中科中成机器人',
    role: '主导开发',
    cover: '/images/x2/motion-studio-main.jpg',
    tags: ['Web 时间线', 'Flutter', 'MCP', 'LLM 编排', 'MuJoCo 数字孪生'],
    summary:
      '一套面向 X2 的动作编排工具：从动作素材库检索动作，在时间线上编排片段、调整入出点和速度，在 MuJoCo 数字孪生中实时预览策略执行效果，确认后再下发到机器人。已申请软件著作权。',
    responsibilities: [
      '搭建 Web 时间线编辑器与 Flutter 桌面 / 移动客户端，支持局域网发现与运行控制',
      '中文动作素材库检索与筛选，提供 MCP 动作目录服务，支持 LLM 根据文字描述生成编排草案',
      '接入 MuJoCo 数字孪生 Runtime，在不发力的条件下复核将要执行的动作序列',
      '新版改为专业剪辑软件式界面，片段之间自动寻找衔接帧直接过渡，不再每段都回站姿',
    ],
    result: '已申请软件著作权；新版动作片段之间的过渡从 1.3–2 秒缩短到约 0.4 秒。',
    images: [
      { src: '/images/x2/motion-studio-main.jpg', caption: '编排台主界面：素材库、数字孪生预览与时间线' },
      { src: '/images/x2/motion-studio.jpg', caption: '策略在数字孪生中执行编排好的动作' },
    ],
  },
  {
    slug: 'dodgeball',
    title: '人形机器人躲避球：感知-控制联调',
    short: '胸挂深度相机识别来球、预测轨迹，强化学习策略实时躲闪，真机闭环跑通。',
    period: '2026.10',
    org: '中科中成机器人',
    role: '感知与真机部署',
    cover: '/images/x2/dodge.jpg',
    tags: ['RGB-D', 'YOLO / TensorRT', 'IMM 轨迹预测', 'C++'],
    summary:
      '让 X2 人形机器人通过胸挂深度相机识别投来的物体并预测轨迹，由强化学习躲避策略实时做出躲闪动作，打通“感知 → 预测 → 控制”的真机闭环。',
    responsibilities: [
      '搭建 RGB-D 感知链路：YOLO 实例分割（TensorRT FP16）+ 深度融合 + IMM 轨迹预测，输出骨盆坐标系下的来球状态',
      '感知模块由 Python 重写为 C++ 并做实时调度优化：帧率提升到 60 fps、延迟减半、丢帧清零',
      '基于全身控制器开发躲避控制器，沿用完整安全机制，打通识别 → 预测 → 控制全链路',
      '通过 MuJoCo 闭环复现，定位真机“总往一侧躲”是训练中形成的策略偏置，并提出对称增广方案',
    ],
    result: '真机实现对投掷物的识别、轨迹预测与躲避；约 2 m 外即可识别出手的投掷物。',
    images: [{ src: '/images/x2/dodge.jpg', caption: '仿真中躲避来球，橙色点为来球轨迹' }],
  },
  {
    slug: 'vln',
    title: '视觉语言导航（VLN）语义导航系统',
    short: '一句“去椅子旁”，机器人自己建图、搜索目标并规划路径。',
    period: '2026.11 – 进行中',
    org: '中科中成机器人',
    role: '导航与感知',
    cover: '/images/x2/vln-ui.jpg',
    tags: ['RTAB-Map', 'Nav2', 'YOLOE', 'Qwen3-VL', 'MuJoCo'],
    summary:
      '根据自然语言指令，让机器人在室内持续建图、搜索目标并生成局部路径，交给已有的路径跟踪器执行。',
    responsibilities: [
      '完成 LightNav、DualVLN 等方案调研选型，搭建轨迹服务（模型适配、坐标变换、有效期检查）',
      'RGB-D 相机 + 3D 雷达融合建图，YOLOE 开放词汇检测与 Qwen3-VL 视觉语言推理',
      '在 MuJoCo 室内仿真中跑通“语言指令 → 搜索 → 导航接近”闭环，实现家具实例记忆与探索点规划',
    ],
    result: '仿真闭环已跑通，正在进行多场景评测与真机验证准备。',
    images: [{ src: '/images/x2/vln-ui.jpg', caption: '语义导航界面：语义地图、实时相机画面与语言任务' }],
  },
  {
    slug: 'freebot',
    title: 'Freebot Control 移动操作机器人全身协同控制',
    short: '11 自由度轮足移动操作机器人的端到端强化学习控制，完成 ROS2 实机部署。',
    period: '2025.12 – 2026.02',
    org: '北京力博泰机器人',
    role: '强化学习控制算法（实习）',
    cover: '/images/freebot-structure.png',
    gif: '/images/freebot-sim.gif',
    tags: ['Isaac Lab', 'Cross-Attention PPO', 'Curriculum Learning', 'ONNX Runtime', 'ROS2'],
    summary:
      '基于 Isaac Lab 构建的端到端强化学习控制项目，面向 11 自由度移动操作机器人，实现底盘平衡、速度跟踪与双臂末端精确追踪的协同控制，并完成从仿真到实机的迁移。',
    responsibilities: [
      '设计基于 Cross-Attention PPO 的策略网络，统一编码多模态传感器输入与目标命令',
      '搭建 108 维观测 / 11 维动作的 MDP，定义底盘平衡、速度跟踪和末端追踪的联合控制目标',
      '设计 Soft-gating 奖励与动态直立奖励，通过 5 阶段课程学习加速训练收敛',
      '主导从 LibTorch 到 ONNX Runtime 的迁移，推理延迟压缩至 5–8 ms',
      '构建观测对齐配置系统，对齐仿真与实机的单位、坐标系、关节顺序与传感器语义',
      '在 ROS2 Humble 中完成实机部署，稳定 100 Hz 控制并适配 VR 低时延遥操作',
    ],
    result:
      '任务成功率 95%；相比无课程学习方案收敛迭代次数降低近 50%；推理延迟 10–15 ms → 5–8 ms，依赖体积约 500 MB → 40 MB。',
    images: [
      { src: '/images/freebot-structure.png', caption: '移动操作机器人结构与任务定义' },
      { src: '/images/freebot-workflow.png', caption: '遥操作到全身控制的系统工作流' },
    ],
  },
  {
    slug: 'sweeper',
    title: '智能规划控制扫地机器人',
    short: '把老旧碰撞式扫地机改装成会建图、会导航的智能机器人，软硬件全部自己做。',
    period: '2024.05 – 至今',
    org: '个人项目',
    role: '全流程独立开发',
    cover: '/images/project1-real1.jpg',
    tags: ['ROS2', 'Cartographer SLAM', 'Isaac Sim', 'PPO', 'FreeRTOS', 'PCB'],
    summary:
      '针对传统碰撞式扫地机器人导航精度差、避障能力弱的问题，基于 ROS2 自主设计了一套完整的智能导航系统，从硬件改造到软件算法全流程开发。',
    responsibilities: [
      '完成机器人结构建模与机械改装，加装激光雷达与 IMU',
      '独立设计 4 层 PCB 控制板（电源管理、电机驱动、传感器接口）',
      '开发 FreeRTOS 底层驱动（PWM 电机控制、I2C / SPI 传感器通信）',
      '实现 ROS2 上层 SLAM 建图、路径规划与运动控制节点',
      '在 Isaac Sim 中用 PPO 训练轨迹跟踪与点到点避障导航，自研 Human-in-the-Loop 训练架构',
    ],
    result: 'SLAM 实时建图精度约 ±5 cm，完成点到点导航与动态避障；导航模型正在进行实机迁移。',
    images: [
      { src: '/images/project1-before.jpg.jpg', caption: '改装前：碰撞式导航' },
      { src: '/images/project1-real1.jpg', caption: '改装后：激光雷达导航' },
      { src: '/images/project1-real2.jpg', caption: '改装后实物' },
      { src: '/images/project1-pcb.png', caption: '自主设计的 4 层控制板' },
      { src: '/images/project1-sim1.png', caption: 'Isaac Lab 训练' },
      { src: '/images/project1-sim2.png', caption: 'Isaac Sim 仿真' },
    ],
    video: { src: '/videos/project1-sim.mp4', poster: '/images/project1-video-thumb.png' },
  },
  {
    slug: 'smartcar',
    title: '讯飞 U_Car_mini 智能车竞赛',
    short: '带队获全国大学生智能车竞赛讯飞赛道全国第二名，负责视觉与任务逻辑。',
    period: '2023.05 – 2023.10',
    org: '全国大学生智能车竞赛',
    role: '队长 · 视觉算法负责人',
    cover: '/images/project2-vision.jpg',
    tags: ['YOLO', '相机-雷达融合', 'TEB', 'ROS'],
    summary:
      '作为队长参加 2023 年全国大学生智能车竞赛讯飞赛道，智能车需要在复杂环境中完成目标识别、计数、定位与路径规划，对视觉算法的实时性和鲁棒性要求很高。',
    responsibilities: [
      '统筹团队开发进度，制定技术方案与分工，协调软硬件联调',
      '优化 YOLO 视觉识别，响应时间从 200 ms 降到 140 ms',
      '设计目标跟踪与状态机，解决物体离开画面后被重复计数的问题',
      '完成相机-雷达标定与坐标变换，实现检测目标在机器人坐标系下的定位；TEB 规划实现狭窄空间避障',
    ],
    result: '获 2023 年全国大学生智能车竞赛讯飞赛道国家一等奖（全国第二名）；目标识别准确率 98% 以上。',
    images: [
      { src: '/images/project2-vision.jpg', caption: '视觉识别与计数' },
      { src: '/images/project2-team.jpg', caption: '全国总决赛现场' },
      { src: '/images/project2-competition.jpg', caption: '比赛记录' },
      { src: '/images/project2-photo.png', caption: '全国总决赛合影' },
    ],
    video: { src: '/videos/project2-car.mp4', poster: '/images/project2-car.png' },
  },
  {
    slug: 'drone',
    title: '无人机飞控系统设计与原型开发',
    short: '从零设计四旋翼飞控：硬件、底层驱动、姿态控制与通信协议。',
    period: '2023.10 – 2024.01',
    org: '个人项目',
    role: '全流程独立开发',
    cover: '/images/project3-board.png',
    tags: ['STM32F407', 'PID', 'FreeRTOS', '互补滤波', 'PCB'],
    summary:
      '独立设计并开发一套四旋翼无人机飞控系统，涵盖硬件设计、底层驱动、控制算法与通信协议，用来深入理解飞行原理和嵌入式实时系统。',
    responsibilities: [
      '完成系统架构设计：硬件选型、通信协议定义、控制流程设计',
      '独立设计 4 层飞控主板 PCB（MCU、传感器接口、电机驱动）',
      '开发 PWM、I2C / SPI / UART、定时器中断等底层驱动',
      '实现角度环 + 角速度环双闭环 PID 姿态控制，互补滤波融合 IMU 数据',
      '开发地面站通信协议，实时回传姿态数据',
    ],
    result: '完成硬件搭建与通信调试，姿态控制系统可稳定控制 Roll / Pitch 姿态。',
    images: [
      { src: '/images/project3-board.png', caption: '飞控主板实物' },
      { src: '/images/project3-code.png', caption: 'PID 控制代码' },
      { src: '/images/project3-wiring.jpg', caption: '传感器接线' },
    ],
    video: { src: '/videos/project3-test.mp4', poster: '/images/project3-test.png' },
  },
]

export const experience = [
  {
    org: '中科中成机器人技术（成都）有限公司',
    role: '运控算法工程师',
    period: '2026.06 – 至今',
    points: [
      '负责 X2 人形机器人（31 自由度）全身动作跟踪策略的训练、评估与 C++ 真机部署',
      '负责复杂地形感知行走、躲避球感知-控制联调与视觉语言导航等方向',
      '主导开发《机器人动作时序编排与仿真验证软件》，已申请软件著作权',
    ],
  },
  {
    org: '北京力博泰机器人科技有限公司',
    role: '运控算法实习生',
    period: '2025.12 – 2026.02',
    points: [
      '负责 11 自由度轮足移动操作机器人的强化学习全身协同控制',
      '完成 ONNX Runtime 推理迁移与 ROS2 实机部署，100 Hz 稳定运行',
    ],
  },
  {
    org: '四川轻化工大学',
    role: '本科 · 智能无人系统技术',
    period: '2022 – 2026',
    points: [
      '专业排名前 20%；人工智能协会学习部副部长',
      '获国家级一等奖 3 项、二等奖 1 项，担任智能车竞赛队长',
    ],
  },
]

export const skillGroups = [
  {
    title: '强化学习与运动控制',
    items: ['PPO', 'DAgger 蒸馏', '对抗运动先验（WGAN-GP）', 'GRU 记忆策略', '可微仿真训练', '奖励与课程设计', '人形全身动作跟踪'],
  },
  {
    title: 'Sim2Real 与真机部署',
    items: ['系统辨识', '域随机化', '校准仿真', 'C++ 实时控制', 'ROS2', 'ONNX Runtime', 'TensorRT'],
  },
  {
    title: '仿真与动作数据',
    items: ['Isaac Lab / Isaac Sim', 'MuJoCo / MuJoCo-Warp', 'ProtoMotions', 'SOMA / GMR 重定向', 'PyTorch', '多卡 DDP'],
  },
  {
    title: '感知与导航',
    items: ['YOLO / YOLOE', 'RGB-D 融合', 'IMM 轨迹预测', 'Cartographer / RTAB-Map', 'Nav2', 'VLM（Qwen3-VL）'],
  },
  {
    title: '嵌入式与硬件',
    items: ['STM32', 'FreeRTOS', 'PID / 电机控制', '4 层 PCB 设计', 'SolidWorks'],
  },
  {
    title: '工具与 Agent',
    items: ['LLM Agent', 'MCP', 'Flutter', 'React', 'Git'],
  },
]

export const awards = [
  {
    year: '2023',
    name: '第十八届全国大学生智能车竞赛全国总决赛 · 讯飞智慧农业组',
    level: '国家一等奖（第二名）',
    role: '队长',
    image: '/images/award-smartcar.jpg',
  },
  {
    year: '2023',
    name: '第五届人工智能算法精英大赛全国总决赛（视觉巡航）',
    level: '国家一等奖',
    role: '核心成员',
    image: '/images/award-ai-algo.jpg',
  },
  {
    year: '2024',
    name: '第二十六届中国机器人及人工智能大赛（目标射击）',
    level: '国家一等奖',
    role: '核心成员',
    image: '/images/award-target.jpg',
  },
  {
    year: '2024',
    name: '第二十六届中国机器人及人工智能大赛（四足仿生机器人-中型）',
    level: '国家二等奖',
    role: '核心成员',
    image: '/images/award-quadruped.jpg',
  },
  {
    year: '2025',
    name: '腾讯开悟人工智能全球公开赛中国内地赛区区域决赛（智能体博弈）',
    level: '第二十名',
    role: '核心成员',
    image: '/images/award-tencent.png',
  },
]

export const life = [
  { src: '/images/life-chat.jpg', caption: '自己写的内网穿透聊天软件' },
  { src: '/images/life-cycling.jpg', caption: '骑行解压，沿途风景给技术灵感' },
  { src: '/images/life-event.jpg', caption: '参加行业沙龙，和同行交流前沿方向' },
  { src: '/images/life-app.png', caption: 'EmojiDaily 日记 App（鸿蒙与安卓）' },
  { src: '/images/life-fan.png', caption: '自己建模并 3D 打印的涡扇风扇' },
  { src: '/images/life-ukulele.jpg', caption: '尤克里里' },
]
