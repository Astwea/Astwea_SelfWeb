import React, { useState, useRef, useEffect } from 'react'
import { createImageErrorHandler } from '../utils/imageHelper'
import { getAssetPath } from '../utils/pathHelper'
import './Projects.css'

const techKeywords = [
  'Cross-Attention PPO',
  'ONNX Runtime',
  'Isaac Lab',
  'Isaac Sim',
  'Omniverse',
  'Cartographer',
  'Human-in-Loop',
  'FreeRTOS',
  'STM32F407',
  'RSL-RL',
  'LibTorch',
  'ROS2',
  'YOLO',
  'OpenCV',
  'obs_alignment',
  'Sim2Real',
  'Curriculum Learning',
  'Domain Randomization',
  'Soft-gating',
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
  let formattedText = text
  const sortedKeywords = [...techKeywords].sort((a, b) => b.length - a.length)

  sortedKeywords.forEach((keyword) => {
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    formattedText = formattedText.replace(regex, '<strong>$1</strong>')
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
      id: 0,
      name: 'Freebot Control - 移动操作机器人全身协同控制系统',
      period: '重点项目',
      role: '强化学习控制算法 / Sim2Real / ROS2 实机部署',
      background:
        'Freebot Control 是一个基于 Isaac Lab 构建的高性能端到端强化学习控制项目，面向 11 自由度移动操作机器人，实现底盘平衡、速度跟踪与双臂末端精确追踪的闭环协同控制，并完成从虚拟仿真到物理实机的高效迁移。',
      tech: [
        'NVIDIA Omniverse、Isaac Sim、Isaac Lab 构建大规模移动操作训练与仿真环境',
        'PyTorch + RSL-RL 强化学习框架，采用 Cross-Attention PPO 策略网络替代传统 RNN/LSTM',
        '108 维观测空间与 11 维动作空间建模，融合 IMU、底盘速度、机械臂状态、CoM 与遥操作特征',
        'Soft-gating 奖励机制 + 5 阶段 Curriculum Learning，平衡底盘稳定与双臂操作的竞争任务',
        'ROS2 Humble（C++）实机控制链路，支持 IMU、1502D 轮式电机、43 系列关节电机与 VR 遥操作输入',
        'ONNX Runtime 推理优化 + obs_alignment 观测对齐系统，保障 Sim2Real 一致性与部署性能',
      ],
      responsibilities: [
        '设计并实现基于 Cross-Attention PPO 的策略网络，完成多模态传感器输入与目标命令的统一编码',
        '搭建 108 维观测 / 11 维动作的 MDP 框架，定义底盘平衡、速度跟踪和末端追踪的联合控制目标',
        '设计 Soft-gating 奖励和动态直立奖励机制，并通过 5 阶段课程学习加速训练收敛',
        '主导从 LibTorch 到 ONNX Runtime 的生产级迁移，将推理延迟压缩至 5-8ms',
        '构建 obs_alignment 配置系统，对齐仿真与实机的单位、坐标系、关节顺序与传感器语义',
        '在 ROS2 Humble 环境中完成实机部署，稳定实现 100Hz 控制频率并适配 VR 低时延交互',
      ],
      images: [
        {
          src: getAssetPath('/images/freebot-sim.gif'),
          alt: 'Freebot Control 仿真动图',
          label: 'Isaac Sim 全身协同控制仿真',
          clickable: true,
        },
        {
          src: getAssetPath('/images/freebot-structure.png'),
          alt: 'Freebot Control 机器人结构示意图',
          label: '移动操作机器人结构与任务定义',
          clickable: true,
        },
        {
          src: getAssetPath('/images/freebot-workflow.png'),
          alt: 'Freebot Control 系统流程图',
          label: '遥操作到全身控制的系统工作流',
          clickable: true,
        },
      ],
      result:
        '项目成果：实现 11 自由度移动操作机器人的全身协同控制，最终任务成功率达到 95%；相比无课程学习方案，收敛所需迭代次数降低近 50%；推理延迟由 10-15ms 优化至 5-8ms，依赖库体积由约 500MB 降至约 40MB，并在 ROS2 Humble 环境下稳定运行 100Hz 实时控制闭环。',
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
          label: '改装后：雷达导航',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-real2.jpg'),
          alt: '改装后扫地机器人',
          label: '改装后：雷达导航',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-sim1.png'),
          alt: 'IsaacLab训练',
          label: 'IsaacLab训练',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-sim2.png'),
          alt: 'IsaacSim仿真',
          label: 'IsaacSim 仿真',
          clickable: true,
        },
        {
          src: getAssetPath('/images/project1-sim3.jpg'),
          alt: 'IsaacSim仿真',
          label: 'IsaacSim 仿真',
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
          label: '目标计数：3 | 坐标：X=1.2,Y=0.8',
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

  const getPlaceholderImage = (text) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${text}%3C/text%3E%3C/svg%3E`
  }

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
    if (!scrollContainer) return

    if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) {
      return
    }

    if (autoScrollIntervals.current[projectId]) {
      clearInterval(autoScrollIntervals.current[projectId])
    }

    autoScrollIntervals.current[projectId] = setInterval(() => {
      if (userInteracting.current[projectId]) {
        return
      }

      if (isResetting.current[projectId]) {
        return
      }

      const container = scrollRefs.current[projectId]
      if (!container) return

      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      const scrollLeft = container.scrollLeft

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
    if (!container) return

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
      if (project.images && project.images.length > 0) {
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

  return (
    <div className="projects">
      <section className="page-header">
        <div className="header-container">
          <h1 className="page-title">项目经验</h1>
          <p className="page-subtitle">从想法到落地，每一步都有细节</p>
        </div>
      </section>

      <section className="projects-section">
        <div className="projects-container">
          {projects.map((project) => {
            const hasMedia = (project.images && project.images.length > 0) || project.video

            return (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h2 className="project-name">{project.name}</h2>
                  <div className="project-meta">
                    <span className="project-period">{project.period}</span>
                    <span className="project-role">{project.role}</span>
                  </div>
                </div>

                <div className={`project-content ${hasMedia ? '' : 'project-content-single'}`}>
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

                  {hasMedia && (
                    <div className="project-right">
                      {project.images && project.images.length > 0 && (
                        <div
                          className="project-images-scroll"
                          ref={(el) => (scrollRefs.current[project.id] = el)}
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
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
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
                              <p className="video-label">点击播放仿真视频</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="project-result">
                  <p>{project.result}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
