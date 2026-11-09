import React from 'react'
import { createImageErrorHandler } from '../utils/imageHelper'
import { getAssetPath, getPdfPath } from '../utils/pathHelper'
import './Contact.css'

const Contact = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = getPdfPath('林森-机器人开发-简历.pdf')
    link.download = '林森-机器人开发-简历.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getPlaceholderImage = (text) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="550"%3E%3Crect fill="%231E3A8A" width="400" height="550"/%3E%3Ctext fill="white" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${text}%3C/text%3E%3C/svg%3E`
  }

  // 创建图片错误处理函数（自动尝试jpg/png格式）
  const handleImageError = createImageErrorHandler(getPlaceholderImage)

  return (
    <div className="contact">
      {/* 页面标题 */}
      <section className="page-header">
        <div className="header-container">
          <h1 className="page-title">联系与简历</h1>
          <p className="page-subtitle">工作机会 / 技术交流，都可随时联系</p>
        </div>
      </section>

      {/* 核心转化区 */}
      <section className="contact-section">
        <div className="contact-container">
          {/* 左侧：简历下载 */}
          <div className="resume-section">
            <h2 className="section-title">下载完整简历</h2>
            <div className="resume-preview">
              <img
                src={getAssetPath('/images/resume-cover.png')} // 实际文件名是.png
                alt="简历封面"
                onError={handleImageError}
              />
            </div>
            <button className="download-btn" onClick={handleDownloadResume}>
              点击下载（PDF 版）
            </button>
            <p className="resume-note">
              简历已更新至 2026 年 11 月，包含人形机器人运动控制项目经历与技能说明
            </p>
          </div>

          {/* 右侧：联系方式 */}
          <div className="contact-info-section">
            <h2 className="section-title">联系方式</h2>

            <div className="contact-group">
              <h3 className="group-title">专业联系</h3>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a
                  href="mailto:senlin733@gmail.com"
                  className="contact-link"
                >
                  senlin733@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-text">
                  <span>13808136972</span>
                  <span className="contact-note">（工作时间：9:00-18:00）</span>
                </div>
              </div>
            </div>

            <div className="contact-group">
              <h3 className="group-title">社交联系</h3>
              <div className="contact-item">
                <span className="contact-icon">💻</span>
                <a
                  href="https://github.com/Astwea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <img
                    src={getAssetPath('/images/github-icon.jpeg')}
                    alt="GitHub"
                    className="social-icon"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  GitHub 账号
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <div className="contact-text">
                  <span className="contact-label">微信账号</span>
                  <span className="contact-note">微信号：linsn_as</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 留言区 */}
      <section className="message-section">
        <div className="message-container">
          <p className="message-text">
            感谢你的关注！无论是机器人开发相关的工作机会，还是技术上的交流探讨，我都很乐意沟通～
          </p>
          <div className="message-icon">🤖</div>
        </div>
      </section>
    </div>
  )
}

export default Contact
