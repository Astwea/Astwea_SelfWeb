import React from 'react'
import { Link } from 'react-router-dom'
import { handleImageError as handleImageErrorHelper, createImageErrorHandler } from '../utils/imageHelper'
import './Home.css'

const Home = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/林森-机器人开发-简历.pdf'
    link.download = '林森-机器人开发-简历.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getPlaceholderImage = (text) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23E5E7EB" width="200" height="200"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${text}%3C/text%3E%3C/svg%3E`
  }

  const handleIconError = createImageErrorHandler(getPlaceholderImage)

  return (
    <div className="home">
      {/* 顶部 Banner */}
      <section className="home-banner">
        <div className="banner-container">
          <div className="banner-left">
            <div className="profile-image-wrapper">
              <img
                src="/images/profile.jpg"
                alt="林森个人形象照"
                className="profile-image"
                onError={(e) => {
                  handleImageErrorHelper(e, () => 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23E5E7EB" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E个人形象照%3C/text%3E%3C/svg%3E')
                }}
              />
            </div>
          </div>
          <div className="banner-right">
            <h1 className="banner-title">林森</h1>
            <p className="banner-subtitle">
              专注 ROS2 开发、嵌入式系统与智能导航
            </p>
            <div className="banner-buttons">
              <Link to="/projects" className="btn-primary">
                查看项目经验
              </Link>
              <button className="btn-secondary" onClick={handleDownloadResume}>
                下载简历
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 核心能力卡片 */}
      <section className="core-skills">
        <div className="skills-container">
          <div className="skill-card">
            <div className="skill-icon">
              <img
                src="/images/ros2-icon.png"
                alt="ROS2"
                onError={(e) => {
                  const placeholder = e.target.nextSibling
                  if (placeholder) {
                    e.target.style.display = 'none'
                    placeholder.style.display = 'flex'
                  } else {
                    e.target.style.display = 'none'
                  }
                }}
              />
              <div className="icon-placeholder" style={{ display: 'none' }}>
                🤖
              </div>
            </div>
            <h3 className="skill-title">ROS2 系统搭建</h3>
            <p className="skill-desc">
              独立完成 SLAM 建图、路径规划与运动控制
            </p>
          </div>

          <div className="skill-card">
            <div className="skill-icon">
              <img
                src="/images/stm32-icon.png"
                alt="STM32"
                onError={(e) => {
                  const placeholder = e.target.nextSibling
                  if (placeholder) {
                    e.target.style.display = 'none'
                    placeholder.style.display = 'flex'
                  } else {
                    e.target.style.display = 'none'
                  }
                }}
              />
              <div className="icon-placeholder" style={{ display: 'none' }}>
                🔧
              </div>
            </div>
            <h3 className="skill-title">嵌入式与硬件开发</h3>
            <p className="skill-desc">
              PCB 设计、电机控制、多传感器集成
            </p>
          </div>

          <div className="skill-card">
            <div className="skill-icon">
              <img
                src="/images/isaac-icon.png"
                alt="强化学习"
                onError={(e) => {
                  const placeholder = e.target.nextSibling
                  if (placeholder) {
                    e.target.style.display = 'none'
                    placeholder.style.display = 'flex'
                  } else {
                    e.target.style.display = 'none'
                  }
                }}
              />
              <div className="icon-placeholder" style={{ display: 'none' }}>
                🧠
              </div>
            </div>
            <h3 className="skill-title">强化学习</h3>
            <p className="skill-desc">
              PPO 算法、Isaac Sim 仿真
            </p>
          </div>

          <div className="skill-card">
            <div className="skill-icon">
              <img
                src="/images/skill-opencv.png"
                alt="计算机视觉"
                onError={(e) => {
                  const placeholder = e.target.nextSibling
                  if (placeholder) {
                    e.target.style.display = 'none'
                    placeholder.style.display = 'flex'
                  } else {
                    e.target.style.display = 'none'
                  }
                }}
              />
              <div className="icon-placeholder" style={{ display: 'none' }}>
                👁️
              </div>
            </div>
            <h3 className="skill-title">计算机视觉</h3>
            <p className="skill-desc">
              相机-雷达融合、目标检测与识别（YOLO、VIT）
            </p>
          </div>
        </div>
      </section>

      {/* 底部 Slogan */}
      <section className="home-slogan">
        <div className="slogan-container">
          <span className="slogan-text">用技术让机器人更智能</span>
          <div className="robot-icon">🤖</div>
        </div>
      </section>
    </div>
  )
}

export default Home
