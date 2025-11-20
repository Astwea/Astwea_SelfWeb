import React, { useState } from 'react'
import { createImageErrorHandler } from '../utils/imageHelper'
import { getAssetPath } from '../utils/pathHelper'
import './Awards.css'

const Awards = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const awards = [
    {
      id: 1,
      name: '腾讯开悟人工智能全球公开赛中国内地赛区第二十名',
      period: '2025',
      role: '团队核心成员',
      image: getAssetPath('/images/award-tencent.png'),
      alt: '腾讯开悟公开赛',
    },
    {
      id: 2,
      name: '中国机器人及人工智能大赛（目标射击）国家一等奖',
      period: '2024',
      role: '团队核心成员',
      image: getAssetPath('/images/award-target.jpg'),
      alt: '目标射击国家一等奖',
    },
    {
      id: 3,
      name: '中国机器人及人工智能大赛（四足仿生机器人）国家二等奖',
      period: '2024',
      role: '团队核心成员',
      image: getAssetPath('/images/award-quadruped.jpg'),
      alt: '四足仿生国家二等奖',
    },
    {
      id: 4,
      name: '全国大学生智能车竞赛全国总决赛讯飞赛道国家一等奖（第二名）',
      period: '2023',
      role: '队长',
      image: getAssetPath('/images/award-smartcar.jpg'),
      alt: '智能车竞赛一等奖',
    },
    {
      id: 5,
      name: '第五届人工智能算法精英大赛全国总决赛（视觉巡航）国家一等奖',
      period: '2023',
      role: '团队核心成员',
      image: getAssetPath('/images/award-ai-algo.jpg'),
      alt: '人工智能算法精英大赛一等奖',
    },
  ]

  const getPlaceholderImage = (text) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23E5E7EB" width="150" height="150"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${text}%3C/text%3E%3C/svg%3E`
  }

  // 创建图片错误处理函数（自动尝试jpg/png格式）
  const handleImageError = createImageErrorHandler(getPlaceholderImage)

  const handleImageClick = (award) => {
    setSelectedImage(award)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const handlePrev = () => {
    const currentIndex = awards.findIndex(
      (award) => award.image === selectedImage.image
    )
    const prevIndex =
      currentIndex === 0 ? awards.length - 1 : currentIndex - 1
    setSelectedImage(awards[prevIndex])
  }

  const handleNext = () => {
    const currentIndex = awards.findIndex(
      (award) => award.image === selectedImage.image
    )
    const nextIndex =
      currentIndex === awards.length - 1 ? 0 : currentIndex + 1
    setSelectedImage(awards[nextIndex])
  }

  return (
    <div className="awards">
      {/* 页面标题 */}
      <section className="page-header">
        <div className="header-container">
          <h1 className="page-title">荣誉奖项</h1>
          <p className="page-subtitle">每一份荣誉，都是技术打磨的见证</p>
        </div>
      </section>

      {/* 奖项列表 */}
      <section className="awards-section">
        <div className="awards-container">
          {awards.map((award) => (
            <div key={award.id} className="award-card" onClick={() => handleImageClick(award)}>
              <div className="award-image-wrapper">
                <img
                  src={award.image}
                  alt={award.alt}
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="award-info">
                <h3 className="award-name">{award.name}</h3>
                <p className="award-meta">
                  {award.period} · {award.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 图片放大模态框 */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <button className="modal-prev" onClick={handlePrev}>
              ‹
            </button>
            <button className="modal-next" onClick={handleNext}>
              ›
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.alt}
              onError={handleImageError}
            />
            <p className="modal-desc">{selectedImage.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Awards
