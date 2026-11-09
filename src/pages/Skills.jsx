import React, { useState, useEffect, useRef } from 'react'
import { createImageErrorHandler } from '../utils/imageHelper'
import { getAssetPath } from '../utils/pathHelper'
import './Skills.css'

const Skills = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [visibleCards, setVisibleCards] = useState(new Set())
  const cardRefs = useRef([])

  const skillCategories = [
    {
      id: 1,
      title: '人形机器人运动控制',
      icon: getAssetPath('/images/skill-humanoid.svg'),
      description: '面向人形机器人的强化学习控制、Sim2Real 与 C++ 真机部署',
      skills: [
        {
          name: '强化学习控制',
          level: 90,
          experience: '2年+',
          description: 'PPO、DAgger 蒸馏、对抗运动先验（WGAN-GP）、GRU 记忆策略，奖励与课程设计',
          projects: ['X2 全身运动控制', 'X2 复杂地形行走', 'Freebot Control', '智能规划控制扫地机器人'],
          details: ['PPO', 'DAgger', 'WGAN-GP', 'GRU', 'Curriculum Learning', '奖励设计'],
        },
        {
          name: '全身动作跟踪',
          level: 88,
          experience: '0.5年',
          description: '人形机器人全身动作模仿、动作连续切换与过渡生成',
          projects: ['X2 全身运动控制'],
          details: ['Isaac Lab', 'ProtoMotions', '动作切换', '过渡生成', '舞蹈模式'],
        },
        {
          name: 'Sim2Real 与辨识',
          level: 85,
          experience: '1年',
          description: '扫频辨识、执行器建模、域随机化与校准仿真，定位真机问题根因',
          projects: ['X2 全身运动控制', 'Freebot Control'],
          details: ['扫频辨识', '延迟 / 摩擦随机化', '踝柔性建模', '校准 MuJoCo', '观测对齐'],
        },
        {
          name: 'C++ 真机部署',
          level: 85,
          experience: '1年',
          description: 'ROS2 C++ 实时控制器、ONNX Runtime / TensorRT 推理与安全机制',
          projects: ['X2 全身运动控制', '躲避球', 'Freebot Control'],
          details: ['50 / 500 Hz 控制环', 'ONNX Runtime', 'TensorRT', '对拍验证', '安全停机'],
        },
      ],
    },
    {
      id: 2,
      title: '机器人开发与仿真',
      icon: getAssetPath('/images/skill-ros2.png'),
      description: '基于 ROS2 生态的机器人系统开发，以及 Isaac / MuJoCo 仿真与动作数据处理',
      skills: [
        {
          name: 'ROS2 架构',
          level: 90,
          experience: '2年+',
          description: '熟练掌握 ROS2 Humble 分布式架构，节点通信、话题订阅发布、服务调用',
          projects: ['X2 全身运动控制', 'Freebot Control', '智能规划控制扫地机器人', '讯飞智能车竞赛'],
          details: ['多节点协同开发', 'DDS 通信机制', '生命周期管理', '参数服务器配置'],
        },
        {
          name: '仿真平台',
          level: 88,
          experience: '2年',
          description: 'Isaac Lab / Isaac Sim 大规模并行训练，MuJoCo / MuJoCo-Warp 闭环验证与批量评估',
          projects: ['X2 全身运动控制', 'Freebot Control', '智能规划控制扫地机器人'],
          details: ['Isaac Lab', 'Isaac Sim', 'MuJoCo', 'MuJoCo-Warp', '多卡 DDP'],
        },
        {
          name: '动作重定向',
          level: 80,
          experience: '0.5年',
          description: 'SOMA / GMR 动作重定向、去穿模与大规模动作数据质量筛选',
          projects: ['X2 全身运动控制'],
          details: ['SOMA', 'GMR', '去穿模', '物理筛选', '14 万段动作数据'],
        },
        {
          name: 'SLAM 与路径规划',
          level: 80,
          experience: '1.5年',
          description: 'Cartographer / RTAB-Map 建图定位，TEB、Nav2 路径规划',
          projects: ['智能规划控制扫地机器人', '讯飞智能车竞赛', 'VLN 语义导航'],
          details: ['Cartographer', 'RTAB-Map', 'Nav2', 'TEB 局部规划', '动态避障'],
        },
      ],
    },
    {
      id: 3,
      title: '嵌入式与硬件',
      icon: getAssetPath('/images/skill-stm32.png'),
      description: 'STM32 微控制器开发、实时操作系统、运动控制与 PCB 设计',
      skills: [
        {
          name: 'STM32 开发',
          level: 90,
          experience: '2.5年+',
          description: 'STM32F4/H7 系列开发，HAL 库与寄存器级编程',
          projects: ['智能规划控制扫地机器人', '智能车竞赛', '四足机器人'],
          details: ['HAL 库开发', '寄存器级优化', '中断处理', 'DMA 数据传输', '低功耗设计'],
        },
        {
          name: 'FreeRTOS',
          level: 85,
          experience: '2年',
          description: '实时任务调度，多任务并发控制，任务间通信',
          projects: ['智能规划控制扫地机器人', '四足机器人'],
          details: ['任务优先级管理', '信号量/队列通信', '定时器任务', '内存管理', '任务同步'],
        },
        {
          name: 'PID 与电机控制',
          level: 88,
          experience: '2年+',
          description: '位置式/增量式 PID、多级串级控制，PWM 电机与舵机驱动',
          projects: ['智能规划控制扫地机器人', '四足机器人', '智能车竞赛'],
          details: ['串级 PID', '抗积分饱和', 'PWM 驱动', '编码器反馈', 'MIT 电机控制'],
        },
        {
          name: 'PCB 设计',
          level: 85,
          experience: '1.5年',
          description: '4层 PCB 设计，原理图绘制，Layout 布局布线',
          projects: ['智能规划控制扫地机器人', '无人机飞控'],
          details: ['嘉立创 EDA', '4层板设计', '电源管理设计', '信号完整性', 'EMC 设计'],
        },
      ],
    },
    {
      id: 4,
      title: '感知与智能体',
      icon: getAssetPath('/images/skill-opencv.png'),
      description: '视觉感知、多传感器融合、视觉语言模型与 Agent 工具开发',
      skills: [
        {
          name: '检测与轨迹预测',
          level: 85,
          experience: '2年',
          description: 'YOLO / YOLOE 检测与分割、TensorRT 部署，RGB-D 深度融合与 IMM 轨迹预测',
          projects: ['躲避球', '讯飞智能车竞赛', 'VLN 语义导航'],
          details: ['YOLO', 'TensorRT', 'RGB-D 融合', 'IMM', 'OpenCV'],
        },
        {
          name: '多传感器融合',
          level: 82,
          experience: '1.5年',
          description: '相机、雷达、IMU 多传感器数据融合与标定，卡尔曼滤波',
          projects: ['躲避球', '智能规划控制扫地机器人', '讯飞智能车竞赛'],
          details: ['相机-雷达标定', '卡尔曼滤波', '坐标变换', '时间同步', '延迟补偿'],
        },
        {
          name: 'VLM 集成',
          level: 75,
          experience: '0.5年',
          description: '视觉语言模型集成，开放词汇检测与语义导航',
          projects: ['VLN 语义导航（进行中）'],
          details: ['Qwen3-VL', 'YOLOE', '语义地图', '场景理解'],
        },
        {
          name: 'Agent 与工具开发',
          level: 78,
          experience: '1年',
          description: 'LLM Agent、MCP 服务、Flutter / Web 工具开发',
          projects: ['机器人动作时序编排软件', '分布式训练监控系统'],
          details: ['LLM Agent', 'MCP', 'Flutter', 'React', '训练监控'],
        },
      ],
    },
  ]

  // 监听卡片进入视口
  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]))
            }
          })
        },
        { threshold: 0.2 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const getPlaceholderImage = (text) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150"%3E%3Crect fill="%23E5E7EB" width="300" height="150"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${text}%3C/text%3E%3C/svg%3E`
  }

  // 创建图片错误处理函数（自动尝试jpg/png格式）
  const handleImageError = createImageErrorHandler(getPlaceholderImage)

  return (
    <div className="skills">
      {/* 页面标题 */}
      <section className="page-header">
        <div className="header-container">
          <h1 className="page-title">技能矩阵</h1>
          <p className="page-subtitle">
            按熟练度从高到低排列，括号内为熟练度百分比
          </p>
        </div>
      </section>

      {/* 技能分类卡片 */}
      <section className="skills-section">
        <div className="skills-container">
          {skillCategories.map((category, cardIndex) => {
            const isHovered = hoveredCard === category.id
            const isVisible = visibleCards.has(cardIndex)
            const isOtherHovered = hoveredCard !== null && hoveredCard !== category.id

            return (
              <div
                key={category.id}
                ref={(el) => (cardRefs.current[cardIndex] = el)}
                className={`skill-category-card ${isHovered ? 'card-hovered' : ''} ${isOtherHovered ? 'card-dimmed' : ''} ${isVisible ? 'card-visible' : ''}`}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`category-icon ${isHovered ? 'icon-hovered' : ''}`}>
                  <img
                    src={category.icon}
                    alt={category.title}
                    onError={handleImageError}
                  />
                </div>
                <h2 className={`category-title ${isHovered ? 'title-hovered' : ''}`}>
                  {category.title}
                </h2>
                {category.description && (
                  <p className={`category-description ${isHovered ? 'description-visible' : ''}`}>
                    {category.description}
                  </p>
                )}
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => {
                    const skillKey = `${category.id}-${skillIndex}`
                    const isSkillHovered = hoveredSkill === skillKey

                    return (
                      <div
                        key={skillIndex}
                        className={`skill-item ${isHovered ? 'skill-item-hovered' : ''} ${isSkillHovered ? 'skill-expanded' : ''}`}
                        style={{
                          animationDelay: `${skillIndex * 0.1}s`,
                        }}
                        onMouseEnter={() => setHoveredSkill(skillKey)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-header">
                          <div className="skill-name-wrapper">
                            <span className={`skill-name ${isHovered ? 'name-hovered' : ''}`}>
                              {skill.name}
                            </span>
                            {skill.experience && (
                              <span className="skill-experience">{skill.experience}</span>
                            )}
                          </div>
                          <span className={`skill-percentage ${isHovered ? 'percentage-hovered' : ''}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-progress-wrapper">
                          <div
                            className={`skill-progress ${isVisible ? 'progress-animated' : ''} ${isHovered ? 'progress-hovered' : ''}`}
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${skillIndex * 0.1}s`,
                            }}
                          >
                            <span className="skill-progress-fill"></span>
                          </div>
                        </div>
                        {isSkillHovered && (
                          <div className="skill-details">
                            {skill.description && (
                              <p className="skill-description">{skill.description}</p>
                            )}
                            {skill.projects && skill.projects.length > 0 && (
                              <div className="skill-projects">
                                <span className="skill-label">相关项目：</span>
                                <span className="skill-projects-list">
                                  {skill.projects.join('、')}
                                </span>
                              </div>
                            )}
                            {skill.details && skill.details.length > 0 && (
                              <div className="skill-tags">
                                {skill.details.map((detail, idx) => (
                                  <span key={idx} className="skill-tag">
                                    {detail}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Skills
