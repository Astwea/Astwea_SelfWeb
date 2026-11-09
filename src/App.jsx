import React, { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import { profile } from './data/site'

/** 路由变化时：有 #锚点 就滚到对应区块，否则回到顶部 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation()
  const prevPath = useRef(null)
  useEffect(() => {
    // 同一页面内点击导航时平滑滚动；首次打开、跨页面跳转时直接定位
    const behavior = prevPath.current === pathname ? 'smooth' : 'auto'
    prevPath.current = pathname
    const el = hash && document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior, block: 'start' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

// 旧版多页面地址，跳到单页对应区块，避免外部旧链接失效
const legacy = { about: 'experience', projects: 'projects', awards: 'awards', skills: 'skills', contact: 'contact' }

function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        {Object.entries(legacy).map(([from, to]) => (
          <Route key={from} path={`/${from}`} element={<Navigate to={{ pathname: '/', hash: `#${to}` }} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="footer">
        <div className="container">
          © 2026 {profile.name} · 最后更新 {profile.updated}
        </div>
      </footer>
    </>
  )
}

export default App
