import React, { useState } from 'react'
import { createImageErrorHandler } from '../utils/imageHelper'
import { getAssetPath } from '../utils/pathHelper'
import './About.css'

const About = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const lifeImages = [
    {
      src: getAssetPath('/images/life-chat.jpg'),
      alt: '内网穿透聊天软件',
      desc: '自主开发内网穿透聊天软件，实现跨网络通信',
    },
    {
      src: getAssetPath('/images/life-cycling.jpg'),
      alt: '运动爱好',
      desc: '骑行解压，沿途风景给技术灵感',
    },
    {
      src: getAssetPath('/images/life-event.jpg'),
      alt: '行业交流',
      desc: '参加行业沙龙，和同行交流前沿方向',
    },
    {
      src: getAssetPath('/images/life-app.jpg'),
      alt: 'EmojiDaily APP',
      desc: 'EmojiDaily - 日记类APP（鸿蒙与安卓端）',
    },
    {
      src: getAssetPath('/images/life-fan.jpg'),
      alt: '3D打印涡扇风扇',
      desc: '3D建模DIY - 自主设计并打印涡扇风扇',
    },
    {
      src: getAssetPath('/images/life-ukulele.jpg'),
      alt: '尤克里里',
      desc: '音乐爱好 - 尤克里里演奏',
    },
  ]

  const getPlaceholderImage = (text) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${text}%3C/text%3E%3C/svg%3E`
  }

  // 创建图片错误处理函数（自动尝试jpg/png格式）
  const handleImageError = createImageErrorHandler(getPlaceholderImage)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const handlePrev = () => {
    const currentIndex = lifeImages.findIndex(
      (img) => img.src === selectedImage.src
    )
    const prevIndex =
      currentIndex === 0 ? lifeImages.length - 1 : currentIndex - 1
    setSelectedImage(lifeImages[prevIndex])
  }

  const handleNext = () => {
    const currentIndex = lifeImages.findIndex(
      (img) => img.src === selectedImage.src
    )
    const nextIndex =
      currentIndex === lifeImages.length - 1 ? 0 : currentIndex + 1
    setSelectedImage(lifeImages[nextIndex])
  }

  return (
    <div className="about">
      {/* 页面标题 */}
      <section className="page-header">
        <div className="header-container">
          <h1 className="page-title">关于我</h1>
          <p className="page-subtitle">
            既是追求极致的工程师，也是热爱生活的探索者
          </p>
        </div>
      </section>

      {/* 职业旅程与核心竞争力 */}
      <section className="professional-section">
        <div className="section-container">
          <div className="journey-card">
            <h2 className="section-title">职业旅程</h2>
            <div className="journey-content">
              <p>
                2022 年入学四川轻化工大学智能无人系统技术专业，从兴趣出发深耕机器人开发，独立完成扫地机器人改装、无人机飞控设计等项目，带领团队获全国智能车竞赛一等奖（第二名），专业排名前 20%。
              </p>
              <p>
                2025 年底在北京力博泰实习，负责轮足移动操作机器人的强化学习全身控制与 ROS2 实机部署；2026 年 6 月加入中科中成机器人，负责 X2 人形机器人的全身动作跟踪、复杂地形行走与真机部署，动作切换、舞蹈模式、躲避球等多个策略已在真机运行。
              </p>
            </div>
            <div className="journey-background">
                  <img
                    src={getAssetPath('/images/lab-scene.jpg')}
                    alt="实验室工作场景"
                    onError={handleImageError}
                  />
            </div>
          </div>

          <div className="competence-card">
            <h2 className="section-title">核心竞争力</h2>
            <ul className="competence-list">
              <li>
                <strong>全链路能力：</strong>
                动作数据（重定向 / 清洗）→ 强化学习训练 → 统一评估 → C++
                真机部署，可独立闭环
              </li>
              <li>
                <strong>Sim2Real 问题定位：</strong>
                借助日志分析、扫频辨识、校准仿真与对照实验，把真机问题拆解到具体根因并修复
              </li>
              <li>
                <strong>前沿方法落地：</strong>
                能快速复现并移植新方法，如单卡复现 SuperMimic 并超过论文结果，再移植到人形机器人
              </li>
              <li>
                <strong>软硬件基础：</strong>
                从 PCB、嵌入式到上层算法都亲手做过；担任竞赛组长，带领团队突破技术难点
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 生活点滴 */}
      <section className="life-section">
        <div className="section-container">
          <div className="life-grid">
            {lifeImages.map((image, index) => (
              <div key={index} className="life-card">
                <div
                  className="life-image-wrapper"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    onError={handleImageError}
                  />
                </div>
                <p className="life-desc">{image.desc}</p>
              </div>
            ))}
          </div>
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
              src={selectedImage.src}
              alt={selectedImage.alt}
              onError={handleImageError}
            />
            <p className="modal-desc">{selectedImage.desc}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default About
