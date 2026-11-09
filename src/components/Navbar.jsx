import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getPdfPath } from '../utils/pathHelper'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/about', label: '关于我' },
    { path: '/projects', label: '项目经验' },
    { path: '/awards', label: '荣誉奖项' },
    { path: '/skills', label: '技能矩阵' },
    { path: '/contact', label: '联系与简历' },
  ]

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = getPdfPath('林森-机器人开发-简历.pdf')
    link.download = '林森-机器人开发-简历.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>林森 - 机器人开发</span>
        </Link>

        {/* 移动端汉堡菜单按钮 */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 导航菜单 */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`navbar-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 下载简历按钮 */}
        <button className="resume-btn" onClick={handleDownloadResume}>
          <span>📄</span>
          <span>下载简历</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
