import React, { useEffect, useRef, useState } from 'react'
import { createImageErrorHandler } from '../utils/imageHelper'
import { getAssetPath } from '../utils/pathHelper'
import './Projects.css'

const techKeywords = [
  'ONNX Runtime',
  'Cross-Attention PPO',
  'Isaac Lab',
  'Isaac Sim',
  'Omniverse',
  'Cartographer',
  'FreeRTOS',
  'STM32F407',
  'STM32',
  'ROS2',
  'OpenCV',
  'YOLO',
  'RSL-RL',
  'LibTorch',
  'Sim2Real',
  'Domain Randomization',
  'Soft-gating',
  'Curriculum Learning',
  '互补滤波',
  '逆运动学',
  '特征匹配',
  '激光雷达',
  '单目相机',
  'SLAM',
  'PPO',
  'PID',
  'TEB',
  'CPG',
  'GPS',
  'TOF',
  'IMU',
  'I2C',
  'SPI',
  'UART',
  'PWM',
  'PCB',
  'Wi-Fi',
  '蓝牙',
  'ROS',
]

const formatTechText = (text) => {
  const sortedKeywords = [...techKeywords].sort((a, b) => b.length - a.length)
  let formattedText = text

  sortedKeywords.forEach((keyword) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    formattedText = formattedText.replace(new RegExp(`(${escaped})`, 'gi'), '<strong>$1</strong>')
  })

  return formattedText
}

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [playingVideo, setPlayingVideo] = useState(null)
  const scrollRefs = useRef({})
  const autoScrollIntervals = useRef({})
  const userInteracting = useRef({})
  const scrollTimeouts = useRef({})
  const lastScrollLeft = useRef({})
  const isResetting = useRef({})

  const projects = [
    {
      id: 'freebot-control',
      featured: true,
      name: 'Freebot Control',
      subtitle: '移动操作机器人全身协同控制系统',
      period: '重点项目',
      role: '端到端强化学习控制 / Sim2Real / ROS2 实机部署',
      summary:
        'Freebot Control 是一个基于 Isaac Lab 构建的高性能端到端强化学习控制项目，面向 11 自由度移动操作机器人，实现底盘平衡、速度跟踪与双臂末端精确追踪的闭环协同控制，并完成从仿真到实机的高效迁移。',
      capabilities: [
        '在复杂动态环境中同时完成底盘稳定、线速度/角速度跟踪与双臂末端目标追踪。',
        '使用单帧推理策略网络，无需维护 hidden state，降低实机部署复杂度。',
        '通过 ROS2 Humble + ONNX Runtime 部署链路，在实机侧稳定运行 100Hz 控制闭环。',
      ],
      highlightStats: [
        { value: '11 DoF', label: '全身控制维度' },
        { value: '108-dim', label: '高维观测空间' },
        { value: '100Hz', label: '实机控制频率' },
        { value: '95%', label: '最终任务成功率' },
      ],
      architecture: [
        { label: '物理引擎 / 仿真', value: 'NVIDIA Omniverse, Isaac Sim, Isaac Lab' },
        { label: '强化学习框架', value: 'PyTorch, RSL-RL' },
        { label: '核心算法', value: 'Cross-Attention PPO' },
        { label: '机器人系统', value: 'ROS2 Humble（C++）' },
        { label: '推理引擎', value: 'ONNX Runtime' },
        { label: '硬件接口', value: 'IMU、1502D 轮式电机、43 系列关节电机、VR 遥操作输入' },
      ],
      deepDives: [
        {
          title: '1. Cross-Attention PPO 策略网络',
          description:
            '相较传统 RNN/LSTM 架构，项目采用 5-Token 编码的 Cross-Attention PPO，对 IMU、关节空间与目标命令等多模态输入建立动态关联。',
          bullets: [
            '避免长序列训练中的梯度稳定性问题，在低速精细作业场景下表现出更快收敛。',
            '推理阶段按帧独立计算，不依赖隐状态缓存，简化部署状态管理与故障恢复。',
            '在移动操作场景中更适合融合姿态、速度、关节与遥操作命令的异构特征。',
          ],
        },
        {
          title: '2. 108 维观测 / 11 维动作建模',
          description:
            '系统围绕移动操作任务构建了高维 MDP：观测空间覆盖 IMU 姿态与加速度、底盘线速度/角速度、机械臂关节与末端状态、重心 CoM 位置及遥操作特征；动作空间直接控制 2 个驱动轮速度和 9 个机械臂/腰部关节位置。',
          bullets: [
            '观测设计兼顾底盘稳定性、上身操作状态和用户意图表达。',
            '动作定义直接贴近实机接口，减少仿真策略到执行层之间的额外映射成本。',
          ],
        },
        {
          title: '3. 多任务平衡与 Soft-gating 奖励机制',
          description:
            '移动底盘平衡与机械臂操作本质上存在竞争关系。项目通过 Soft-gating 对末端追踪奖励进行动态抑制，而非简单硬切断，使策略能在优先保障物理稳定性的同时继续学习操作行为。',
          bullets: [
            '当底盘速度误差较大时，末端追踪奖励被衰减而不是归零，保留学习信号。',
            '直立奖励随运动速度动态调节，允许机器人在加速阶段产生合理倾角，换取更高运动性能。',
            '奖励设计重点解决“平衡优先”和“任务持续学习”之间的冲突。',
          ],
        },
        {
          title: '4. 五阶段课程学习',
          description:
            '训练流程采用从静态平衡到全身协调遥操作的五阶段课程学习，逐步引入机械臂扰动、主动补偿与高速运动条件。',
          bullets: [
            '训练阶段由简入繁，显著降低早期探索难度。',
            '最终任务成功率达到 95%，相比无课程学习方案，收敛迭代次数降低近 50%。',
            '课程设计直接服务于 Sim2Real，确保后期阶段更接近真实控制需求。',
          ],
        },
      ],
      metrics: [
        { name: '推理延迟', baseline: '10-15 ms', optimized: '5-8 ms', improvement: '40% ↓' },
        { name: '依赖库大小', baseline: '~500 MB', optimized: '~40 MB', improvement: '92% ↓' },
        { name: '内存占用', baseline: '~800 MB', optimized: '~400 MB', improvement: '50% ↓' },
        { name: '系统启动时间', baseline: '~2 s', optimized: '~0.5 s', improvement: '75% ↓' },
      ],
      deploymentNotes: [
        '主导从 LibTorch 到 ONNX Runtime 的生产级迁移，显著降低部署体积与推理开销。',
        '通过 obs_alignment 配置系统统一仿真与实机的单位、坐标系与关节顺序，保证观测严格对齐。',
        '在 ROS2 Humble 环境中实现稳定 100Hz 控制频率，满足 VR 遥操作的低时延交互需求。',
      ],
      nextSteps: [
        '加入坡道、阶梯与动态障碍物场景，提升环境泛化能力。',
        '引入 Domain Randomization，进一步增强 Sim2Real 鲁棒性。',
        '集成深度相机，支持基于视觉感知的末端闭环抓取。',
      ],
      projectStats: [
        'Python 代码约 15,000 行',
        'C++ 代码约 600 行',
        '25+ 份核心技术文档',
      ],
      result:
        '项目结果：在单一策略中实现底盘平衡、速度跟踪和双臂末端追踪的全身协同控制，完成从强化学习训练到 ROS2 实机部署的完整闭环，并将部署性能优化到可支撑稳定 100Hz 的实时控制。',
    },
    {
      id: 1,
      name: '智能规划控制扫地机器人',
      period: '2024.05 - 至今',
      role: '个人开发（全流程负责）',
      background:
        '针对传统碰撞式扫地机器人智能化程度低、导航精度差、避障能力弱等痛点，基于 ROS2 生态自主设计并实现了一套完整的智能导航系统。项目从硬件改造到软件算法全流程开发，将老旧设备升级为具备 SLAM 建图、路径规划、动态避障能力的智能机器人。',
      tech: [
        'ROS2 Humble 分布式架构（节点通信、话题订阅发布）',
        'Cartographer SLAM 实时建图与定位',
        'Isaac Sim 物理仿真环境（PPO 强化学习训练轨迹跟踪）',
        'FreeRTOS 实时任务调度（电机控制、传感器数据采集）',
        '4 层 PCB 设计（嘉立创 EDA，集成 MPU6050、TOF 传感器）',
      ],
      responsibilities: [
        '完成机器人结构建模与机械改装（增加激光雷达、IMU 传感器）',
        '独立设计并绘制 4 层 PCB 控制板（电源管理、电机驱动、传感器接口）',
        '开发底层 FreeRTOS 驱动（PWM 电机控制、I2C/SPI 传感器通信）',
        '实现 ROS2 上层算法（SLAM 建图节点、路径规划节点、运动控制节点）',
        '构建 Isaac Sim 仿真环境，使用 PPO 算法训练导航策略',
        '设计 Human-in-Loop 训练架构，实现仿真到实机的知识迁移',
      ],
      images: [
        {
          src: getAssetPath('/images/project1-before.jpg.jpg'),
          alt: '改装前扫地机器人',
          label: '改装前：碰撞式导航',
          clickable: false,
        },
        {
          src: getAssetPath('/images/project1-real1.jpg'),
          alt: '改装后扫地机器人',
          label: '改装后：硬件系统集成',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-real2.jpg'),
          alt: '改装后扫地机器人',
          label: '改装后：导航硬件实物',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-sim1.png'),
          alt: 'Isaac Lab 训练场景',
          label: 'Isaac Lab 训练场景',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-sim2.png'),
          alt: '建图与导航界面',
          label: 'ROS2 导航与建图验证',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-sim3.jpg'),
          alt: 'Isaac Sim 仿真',
          label: 'Isaac Sim 轨迹跟踪仿真',
          clickable: true,
        },
      ],
      video: {
        src: getAssetPath('/videos/project1-sim.mp4'),
        thumbnail: getAssetPath('/images/project1-video-thumb.png'),
        alt: 'Isaac Sim 仿真视频',
      },
      result:
        '项目成果：成功实现 SLAM 实时建图（精度 ±5cm），完成点到点导航与动态避障功能，自主开发的 Human-in-Loop 训练架构显著提升了模型在复杂环境下的鲁棒性。目前正在进行导航模型鲁棒性测试与实机迁移验证，预计将导航成功率提升至 95% 以上。',
    },
    {
      id: 2,
      name: '讯飞 U_Car_mini 智能车竞赛项目',
      period: '2023.05 - 2023.10',
      role: '项目组长 + 视觉算法负责人',
      background:
        '作为项目组长参与 2023 年全国大学生智能车竞赛讯飞赛道，负责智能车的视觉识别系统优化与狭窄空间避障算法开发。项目要求智能车在复杂环境中完成目标识别、计数、定位与路径规划等任务，对视觉算法的实时性与鲁棒性提出了极高要求。',
      tech: [
        'YOLO 目标检测算法（实时目标识别与定位）',
        '单目相机 + 激光雷达融合感知（世界坐标系重建与标定）',
        'TEB（Time Elastic Band）局部路径规划算法',
        '基于 YOLO 的目标跟踪与重复计数解决算法',
        '多传感器数据融合（相机-雷达时间同步、坐标变换）',
        'ROS 节点通信架构（视觉处理节点、路径规划节点）',
      ],
      responsibilities: [
        '统筹团队开发进度，制定技术方案与任务分工，协调硬件与软件联调',
        '基于 YOLO 模型优化视觉识别算法，将识别响应速度从 200ms 优化至 140ms，提升 30%',
        '设计并实现基于 YOLO 检测结果的目标跟踪与重复计数解决算法，通过目标特征跟踪与状态机管理，解决物体脱离画面后重复计数问题',
        '改进任务决策逻辑，设计权重决策机制，优化子任务优先级调度',
        '完成相机-雷达标定与坐标变换，实现 YOLO 检测目标在机器人坐标系下的精确定位',
      ],
      images: [
        {
          src: getAssetPath('/images/project2-vision.jpg'),
          alt: '视觉识别界面',
          label: '目标计数：3 | 坐标：X=1.2, Y=0.8',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project2-team.jpg'),
          alt: '竞赛现场合影',
          label: '全国智能车竞赛',
          clickable: false,
        },
        {
          src: getAssetPath('/images/project2-competition.jpg'),
          alt: '竞赛现场记录',
          label: '全国智能车竞赛',
          clickable: false,
        },
        {
          src: getAssetPath('/images/project2-photo.png'),
          alt: '竞赛现场大合影',
          label: '全国智能车竞赛',
          clickable: false,
        },
      ],
      video: {
        src: getAssetPath('/videos/project2-car.mp4'),
        thumbnail: getAssetPath('/images/project2-car.png'),
        alt: '智能车实物视频',
      },
      result:
        '项目成果：带领团队获得 2023 年全国大学生智能车竞赛讯飞赛道全国一等奖（第二名），视觉识别响应速度提升 30%，成功解决物体脱离画面重复计数问题，目标识别准确率达到 98% 以上。项目展现了在视觉算法优化、多传感器融合、团队协作等方面的综合能力。',
    },
    {
      id: 3,
      name: '无人机飞控系统设计与原型开发',
      period: '2023.10 - 2024.01',
      role: '个人开发（全流程负责）',
      background:
        '从零开始独立设计并开发一套完整的四旋翼无人机飞控系统，涵盖硬件设计、底层驱动、控制算法与通信协议。项目旨在深入理解无人机飞行原理，掌握嵌入式实时系统设计与多传感器数据融合技术，为后续机器人开发奠定坚实基础。',
      tech: [
        'STM32F407 微控制器（ARM Cortex-M4，168MHz 主频）',
        'PID 姿态闭环控制（Roll/Pitch/Yaw 三轴姿态稳定）',
        '多传感器融合算法（MPU6050 六轴 IMU + TOF 测距 + GPS 定位）',
        'Wi-Fi + 蓝牙双模通信（ESP8266 模块，实现地面站数据交互）',
        'FreeRTOS 实时操作系统（多任务调度、中断管理）',
      ],
      responsibilities: [
        '完成系统整体架构设计（硬件选型、通信协议定义、控制流程设计）',
        '独立设计并绘制飞控主板 PCB（4 层板，集成 MCU、传感器接口、电机驱动电路）',
        '开发底层嵌入式驱动（PWM 电机控制、I2C/SPI/UART 通信、定时器中断）',
        '实现 PID 姿态控制算法（角度环、角速度环双闭环控制，参数整定与优化）',
        '设计多传感器融合算法（互补滤波融合 IMU 数据，实现姿态解算）',
        '开发地面站通信协议（数据包封装、校验、实时姿态数据回传）',
      ],
      images: [
        {
          src: getAssetPath('/images/project3-board.png'),
          alt: '飞控主板',
          label: '飞控主板实物',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project3-code.png'),
          alt: 'PID 算法代码',
          label: 'PID 算法代码',
          clickable: false,
        },
        {
          src: getAssetPath('/images/project3-wiring.jpg'),
          alt: '传感器接线示意图',
          label: '传感器接线示意图',
          clickable: false,
        },
      ],
      video: {
        src: getAssetPath('/videos/project3-test.mp4'),
        thumbnail: getAssetPath('/images/project3-test.png'),
        alt: '无人机飞行测试',
      },
      result:
        '项目成果：成功完成硬件搭建与基础通信调试，姿态控制系统初步实现，能够稳定控制无人机 Roll/Pitch 姿态。通过该项目深入掌握了嵌入式实时系统设计、中断管理、任务调度、传感器融合等核心技术，为后续机器人开发积累了丰富的实践经验。',
    },
  ]

  const getPlaceholderImage = (text) =>
    `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${text}%3C/text%3E%3C/svg%3E`

  const handleImageError = createImageErrorHandler(getPlaceholderImage)

  const handleImageClick = (image) => {
    if (image.clickable) {
      setSelectedImage(image)
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const handleVideoPlay = (projectId) => {
    setPlayingVideo(playingVideo === projectId ? null : projectId)
  }

  const startAutoScroll = (projectId) => {
    const scrollContainer = scrollRefs.current[projectId]
    if (!scrollContainer || scrollContainer.scrollWidth <= scrollContainer.clientWidth) {
      return
    }

    if (autoScrollIntervals.current[projectId]) {
      clearInterval(autoScrollIntervals.current[projectId])
    }

    autoScrollIntervals.current[projectId] = setInterval(() => {
      if (userInteracting.current[projectId] || isResetting.current[projectId]) {
        return
      }

      const container = scrollRefs.current[projectId]
      if (!container) {
        return
      }

      const { scrollWidth, clientWidth, scrollLeft } = container

      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        isResetting.current[projectId] = true
        container.scrollTo({ left: 0, behavior: 'auto' })
        setTimeout(() => {
          isResetting.current[projectId] = false
        }, 100)
      } else {
        container.scrollBy({ left: 1, behavior: 'auto' })
      }
    }, 50)
  }

  const stopAutoScroll = (projectId) => {
    if (autoScrollIntervals.current[projectId]) {
      clearInterval(autoScrollIntervals.current[projectId])
      autoScrollIntervals.current[projectId] = null
    }
  }

  const handleUserInteractionStart = (projectId) => {
    userInteracting.current[projectId] = true
    stopAutoScroll(projectId)
  }

  const handleUserInteractionEnd = (projectId) => {
    userInteracting.current[projectId] = false

    if (scrollTimeouts.current[projectId]) {
      clearTimeout(scrollTimeouts.current[projectId])
    }

    scrollTimeouts.current[projectId] = setTimeout(() => {
      if (!userInteracting.current[projectId]) {
        startAutoScroll(projectId)
      }
    }, 3000)
  }

  const handleScroll = (projectId) => {
    const container = scrollRefs.current[projectId]
    if (!container) {
      return
    }

    const currentScrollLeft = container.scrollLeft
    const lastScroll = lastScrollLeft.current[projectId]

    if (lastScroll !== undefined && Math.abs(currentScrollLeft - lastScroll) > 5) {
      handleUserInteractionStart(projectId)
      handleUserInteractionEnd(projectId)
    }

    lastScrollLeft.current[projectId] = currentScrollLeft
  }

  useEffect(() => {
    projects.forEach((project) => {
      if (project.images?.length) {
        setTimeout(() => {
          startAutoScroll(project.id)
        }, 500)
      }
    })

    return () => {
      Object.keys(autoScrollIntervals.current).forEach((projectId) => {
        stopAutoScroll(projectId)
      })

      Object.keys(scrollTimeouts.current).forEach((projectId) => {
        if (scrollTimeouts.current[projectId]) {
          clearTimeout(scrollTimeouts.current[projectId])
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderDefaultProject = (project) => (
    <div key={project.id} className="project-card">
      <div className="project-header">
        <h2 className="project-name">{project.name}</h2>
        <div className="project-meta">
          <span className="project-period">{project.period}</span>
          <span className="project-role">{project.role}</span>
        </div>
      </div>

      <div className="project-content">
        <div className="project-left">
          <div className="project-detail">
            <h3 className="detail-title">项目背景</h3>
            <p className="detail-text">{project.background}</p>
          </div>

          <div className="project-detail">
            <h3 className="detail-title">核心技术</h3>
            <ul className="tech-list">
              {project.tech.map((tech, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: formatTechText(tech) }} />
              ))}
            </ul>
          </div>

          <div className="project-detail">
            <h3 className="detail-title">我的职责</h3>
            <ul className="tech-list">
              {project.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-right">
          {project.images?.length > 0 && (
            <div
              className="project-images-scroll"
              ref={(el) => {
                scrollRefs.current[project.id] = el
              }}
              onMouseDown={() => handleUserInteractionStart(project.id)}
              onMouseUp={() => handleUserInteractionEnd(project.id)}
              onMouseLeave={() => handleUserInteractionEnd(project.id)}
              onTouchStart={() => handleUserInteractionStart(project.id)}
              onTouchEnd={() => handleUserInteractionEnd(project.id)}
              onScroll={() => handleScroll(project.id)}
            >
              <div className="project-images">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className={`project-image-wrapper ${image.clickable ? 'clickable' : ''}`}
                    onClick={() => image.clickable && handleImageClick(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      onError={handleImageError}
                      loading="lazy"
                    />
                    {image.label && <div className="image-label">{image.label}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.video && (
            <div className="project-video">
              {playingVideo === project.id ? (
                <video
                  controls
                  autoPlay
                  src={project.video.src}
                  onError={(event) => {
                    event.target.style.display = 'none'
                    if (event.target.nextSibling) {
                      event.target.nextSibling.style.display = 'flex'
                    }
                  }}
                >
                  您的浏览器不支持视频播放
                </video>
              ) : (
                <div className="video-thumbnail" onClick={() => handleVideoPlay(project.id)}>
                  <img
                    src={project.video.thumbnail || getAssetPath('/images/video-placeholder.jpg')}
                    alt={project.video.alt}
                    onError={handleImageError}
                  />
                  <div className="play-button">▶</div>
                  <p className="video-label">点击播放演示视频</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="project-result">
        <p>{project.result}</p>
      </div>
    </div>
  )

  const renderFeaturedProject = (project) => (
    <div key={project.id} className="project-card featured-project-card">
      <div className="featured-project-hero">
        <div className="featured-project-copy">
          <span className="featured-badge">Featured Project</span>
          <h2 className="project-name featured-project-name">{project.name}</h2>
          <p className="featured-project-subtitle">{project.subtitle}</p>
          <div className="project-meta featured-project-meta">
            <span className="project-period">{project.period}</span>
            <span className="project-role">{project.role}</span>
          </div>
          <p className="featured-summary">{project.summary}</p>
        </div>
        <div className="featured-highlight-grid">
          {project.highlightStats.map((item) => (
            <div key={item.label} className="highlight-stat-card">
              <div className="highlight-stat-value">{item.value}</div>
              <div className="highlight-stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-panel">
        <h3 className="detail-title">项目概览</h3>
        <ul className="tech-list">
          {project.capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="featured-two-column">
        <section className="featured-panel">
          <h3 className="detail-title">技术架构</h3>
          <div className="architecture-grid">
            {project.architecture.map((item) => (
              <div key={item.label} className="architecture-item">
                <span className="architecture-label">{item.label}</span>
                <p className="architecture-value">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="featured-panel">
          <h3 className="detail-title">项目统计</h3>
          <div className="project-stat-list">
            {project.projectStats.map((item) => (
              <div key={item} className="project-stat-chip">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="featured-panel">
        <h3 className="detail-title">核心技术深度解析</h3>
        <div className="deep-dive-list">
          {project.deepDives.map((item) => (
            <article key={item.title} className="deep-dive-card">
              <h4 className="deep-dive-title">{item.title}</h4>
              <p className="deep-dive-description">{item.description}</p>
              <ul className="tech-list compact-list">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="featured-two-column featured-bottom-grid">
        <section className="featured-panel">
          <h3 className="detail-title">Sim2Real 迁移与量化成果</h3>
          <div className="metrics-table-wrapper">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>性能指标</th>
                  <th>LibTorch</th>
                  <th>ONNX Runtime</th>
                  <th>提升幅度</th>
                </tr>
              </thead>
              <tbody>
                {project.metrics.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.baseline}</td>
                    <td>{item.optimized}</td>
                    <td>{item.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="tech-list compact-list">
            {project.deploymentNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="featured-panel">
          <h3 className="detail-title">下一步计划</h3>
          <ul className="tech-list">
            {project.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="project-result featured-result">
        <p>{project.result}</p>
      </div>
    </div>
  )

  return (
    <div className="projects">
      <section className="page-header">
        <div className="header-container">
          <h1 className="page-title">项目经验</h1>
          <p className="page-subtitle">相比纸质简历，这里更完整地展示架构、算法、部署与量化结果</p>
        </div>
      </section>

      <section className="projects-section">
        <div className="projects-container">
          {projects.map((project) =>
            project.featured ? renderFeaturedProject(project) : renderDefaultProject(project)
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} onError={handleImageError} />
            <p className="modal-desc">{selectedImage.label}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
