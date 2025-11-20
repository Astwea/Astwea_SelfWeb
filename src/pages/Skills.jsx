import React from 'react'
import { createImageErrorHandler } from '../utils/imageHelper'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      id: 1,
      title: '机器人开发',
      icon: '/images/skill-ros2.png',
      skills: [
        { name: 'ROS2 架构', level: 90 },
        { name: 'SLAM 建图', level: 85 },
        { name: '路径规划', level: 80 },
        { name: '多机器人协同仿真', level: 75 },
      ],
    },
    {
      id: 2,
      title: '嵌入式与实时控制',
      icon: '/images/image.png',
      skills: [
        { name: 'STM32 开发', level: 90 },
        { name: 'FreeRTOS', level: 85 },
        { name: 'PID 算法', level: 88 },
        { name: 'PWM 驱动', level: 80 },
      ],
    },
    {
      id: 3,
      title: '计算机视觉与传感器融合',
      icon: '/images/skill-opencv.png',
      skills: [
        { name: '相机 - 雷达校准', level: 80 },
        { name: '多传感器融合', level: 82 },
        { name: 'OpenCV', level: 75 },
        { name: 'VLM 集成', level: 70 },
      ],
    },
    {
      id: 4,
      title: '其他技能',
      icon: '/images/skill-other.png',
      skills: [
        { name: 'PCB 设计', level: 85 },
        { name: 'Git 版本控制', level: 80 },
        { name: '强化学习', level: 75 },
        { name: 'SolidWorks 建模', level: 60 },
      ],
    },
  ]

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
          {skillCategories.map((category) => (
            <div key={category.id} className="skill-category-card">
              <div className="category-icon">
                <img
                  src={category.icon}
                  alt={category.title}
                  onError={handleImageError}
                />
              </div>
              <h2 className="category-title">{category.title}</h2>
              <div className="skills-list">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-progress-wrapper">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      >
                        <span className="skill-progress-fill"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Skills
