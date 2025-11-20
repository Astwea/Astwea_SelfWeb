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
      title: '机器人开发',
      icon: getAssetPath('/images/skill-ros2.png'),
      description: '基于 ROS2 生态的机器人系统开发，涵盖导航、感知、控制全栈技术',
      skills: [
        {
          name: 'ROS2 架构',
          level: 90,
          experience: '2年+',
          description: '熟练掌握 ROS2 Humble 分布式架构，节点通信、话题订阅发布、服务调用',
          projects: ['智能规划控制扫地机器人', '讯飞智能车竞赛'],
          details: ['多节点协同开发', 'DDS 通信机制', '生命周期管理', '参数服务器配置'],
        },
        {
          name: 'SLAM 建图',
          level: 85,
          experience: '1.5年',
          description: '基于 Cartographer 的实时建图与定位，激光雷达 SLAM 实现',
          projects: ['智能规划控制扫地机器人'],
          details: ['Cartographer 算法调优', '地图精度 ±5cm', '回环检测优化', '多传感器融合定位'],
        },
        {
          name: '路径规划',
          level: 80,
          experience: '1年+',
          description: '全局路径规划（A*、Dijkstra）与局部路径规划（TEB、DWA）',
          projects: ['智能规划控制扫地机器人', '讯飞智能车竞赛'],
          details: ['TEB 局部规划', '动态避障算法', '路径平滑优化', '多目标点导航'],
        },
        {
          name: '多机器人协同仿真',
          level: 75,
          experience: '1年',
          description: 'Isaac Sim 多机器人仿真环境搭建，协同任务规划',
          projects: ['智能规划控制扫地机器人'],
          details: ['Isaac Sim 环境构建', '多机器人通信仿真', '协同路径规划', '仿真到实机迁移'],
        },
      ],
    },
    {
      id: 2,
      title: '嵌入式与实时控制',
      icon: getAssetPath('/images/skill-stm32.png'),
      description: 'STM32 微控制器开发，实时操作系统与运动控制算法',
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
          name: 'PID 算法',
          level: 88,
          experience: '2年+',
          description: '位置式/增量式 PID，参数整定，多级 PID 控制',
          projects: ['智能规划控制扫地机器人', '四足机器人', '智能车竞赛'],
          details: ['位置式/增量式 PID', '参数自整定', '抗积分饱和', '模糊 PID', '多级 PID 串级控制'],
        },
        {
          name: 'PWM 驱动',
          level: 80,
          experience: '2年',
          description: 'PWM 波形生成，电机驱动控制，频率与占空比调节',
          projects: ['智能规划控制扫地机器人', '四足机器人'],
          details: ['PWM 波形生成', '电机速度控制', '舵机角度控制', '频率可调 PWM', '死区时间设置'],
        },
      ],
    },
    {
      id: 3,
      title: '计算机视觉与传感器融合',
      icon: getAssetPath('/images/skill-opencv.png'),
      description: '计算机视觉算法开发，多传感器数据融合与标定',
      skills: [
        {
          name: '相机 - 雷达校准',
          level: 80,
          experience: '1年',
          description: '单目相机与激光雷达联合标定，坐标系统一与时间同步',
          projects: ['讯飞智能车竞赛'],
          details: ['相机内参标定', '雷达-相机外参标定', '坐标变换', '时间同步', '标定精度验证'],
        },
        {
          name: '多传感器融合',
          level: 82,
          experience: '1.5年',
          description: '相机、雷达、IMU 多传感器数据融合，卡尔曼滤波',
          projects: ['智能规划控制扫地机器人', '讯飞智能车竞赛'],
          details: ['传感器数据融合', '卡尔曼滤波', '扩展卡尔曼滤波', '数据关联', '融合定位'],
        },
        {
          name: 'OpenCV',
          level: 75,
          experience: '1年',
          description: '图像处理、特征提取、目标检测与跟踪',
          projects: ['讯飞智能车竞赛'],
          details: ['图像预处理', '特征点检测', '轮廓提取', '形态学操作', '图像变换'],
        },
        {
          name: 'VLM 集成',
          level: 70,
          experience: '0.5年',
          description: '视觉语言模型集成，多模态感知与理解',
          projects: ['智能规划控制扫地机器人（进行中）'],
          details: ['VLM API 调用', '多模态数据处理', '视觉问答', '场景理解'],
        },
      ],
    },
    {
      id: 4,
      title: '其他技能',
      icon: getAssetPath('/images/skill-other.png'),
      description: '硬件设计、版本控制、算法研究与 3D 建模',
      skills: [
        {
          name: 'PCB 设计',
          level: 85,
          experience: '1.5年',
          description: '4层 PCB 设计，原理图绘制，Layout 布局布线',
          projects: ['智能规划控制扫地机器人'],
          details: ['嘉立创 EDA', '4层板设计', '电源管理设计', '信号完整性', 'EMC 设计'],
        },
        {
          name: 'Git 版本控制',
          level: 80,
          experience: '2年+',
          description: 'Git 工作流，分支管理，代码协作',
          projects: ['所有项目'],
          details: ['Git 工作流', '分支管理', '代码审查', '冲突解决', 'CI/CD 集成'],
        },
        {
          name: '强化学习',
          level: 75,
          experience: '1年',
          description: 'PPO 算法，仿真环境训练，策略迁移',
          projects: ['智能规划控制扫地机器人'],
          details: ['PPO 算法', 'Isaac Sim 训练', '奖励函数设计', '仿真到实机迁移', 'Human-in-Loop'],
        },
        {
          name: 'SolidWorks 建模',
          level: 60,
          experience: '0.5年',
          description: '3D 机械建模，装配体设计，工程图绘制',
          projects: ['智能规划控制扫地机器人'],
          details: ['3D 建模', '装配体设计', '工程图', '运动仿真'],
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
