import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, profile } from '../data/site'
import { asset } from '../utils/media'

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          {profile.name}
          <span>{profile.title}</span>
        </Link>
        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label="菜单"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <Link key={item.id} to={{ pathname: '/', hash: `#${item.id}` }}>
              {item.label}
            </Link>
          ))}
          <a className="btn btn-small" href={asset(profile.resume)} download>
            简历 PDF
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Nav
