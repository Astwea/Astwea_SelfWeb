import React from 'react'
import { Link } from 'react-router-dom'
import { handleImageError as handleImageErrorHelper } from '../utils/imageHelper'
import { getAssetPath, getPdfPath } from '../utils/pathHelper'
import './Home.css'

const coreSkills = [
  {
    icon: null,
    emoji: '🦾',
    title: '人形机器人全身控制',
    desc: '全身动作跟踪、动作切换与复杂地形行走，多项策略已在真机运行',
  },
  {
    icon: null,
    emoji: '🧠',
    title: '强化学习与 Sim2Real',
    desc: 'PPO、DAgger、对抗运动先验；系统辨识、域随机化与校准仿真',
  },
  {
    icon: '/images/ros2-icon.png',
    emoji: '🤖',
    title: 'C++ 真机部署',
    desc: 'ROS2 实时控制器、ONNX / TensorRT 推理与完整安全停机机制',
  },
  {
    icon: '/images/skill-opencv.png',
    emoji: '👁️',
    title: '感知与导航',
    desc: 'RGB-D 目标检测与轨迹预测、SLAM 建图与视觉语言导航',
  },
]

const Home = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = getPdfPath('林森-机器人开发-简历.pdf')
    link.download = '林森-机器人开发-简历.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="home">
      {/* 顶部 Banner */}
      <section className="home-banner">
        <div className="banner-container">
          <div className="banner-left">
            <div className="profile-image-wrapper">
              <img
                src={getAssetPath('/images/profile.jpg')}
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
              人形机器人运动控制 · 强化学习 · Sim2Real 真机部署
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
          {coreSkills.map((skill) => (
            <div key={skill.title} className="skill-card">
              <div className="skill-icon">
                {skill.icon && (
                  <img
                    src={getAssetPath(skill.icon)}
                    alt={skill.title}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                )}
                <div className="icon-placeholder" style={{ display: skill.icon ? 'none' : 'flex' }}>
                  {skill.emoji}
                </div>
              </div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-desc">{skill.desc}</p>
            </div>
          ))}
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
