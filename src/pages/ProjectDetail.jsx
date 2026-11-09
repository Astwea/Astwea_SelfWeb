import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Lightbox from '../components/Lightbox'
import { projects } from '../data/site'
import { asset, thumb } from '../utils/media'

const ProjectDetail = () => {
  const { slug } = useParams()
  const [idx, setIdx] = useState(null)
  const [playing, setPlaying] = useState(false)
  const i = projects.findIndex((p) => p.slug === slug)
  const p = projects[i]

  useEffect(() => {
    setPlaying(false)
    if (p) document.title = `${p.title} · 林森`
    return () => { document.title = '林森 - 机器人运动控制算法工程师' }
  }, [p])

  if (!p) return <Navigate to="/" replace />

  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const gallery = p.gif ? [{ src: p.gif, caption: '动图演示' }, ...p.images] : p.images
  const hero = gallery[0]

  return (
    <main className="detail">
      <div className="container">
        <Link className="back" to={{ pathname: '/', hash: '#projects' }}>← 返回项目列表</Link>

        <header className="detail-head">
          <span className="meta">{p.org} · {p.period}</span>
          <h1>{p.title}</h1>
          <p className="lead">{p.summary}</p>
          <ul className="tags">
            {p.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </header>

        <button className="detail-hero" onClick={() => setIdx(0)} aria-label="查看大图">
          <img src={thumb(hero.src)} alt={hero.caption} />
          {hero.caption && <span>{hero.caption}</span>}
        </button>

        <div className="detail-body">
          <div className="detail-main">
            <section>
              <h2>我做了什么</h2>
              <ul className="checks">
                {p.responsibilities.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </section>
            <section className="result">
              <h2>成果</h2>
              <p>{p.result}</p>
            </section>
          </div>
          <aside className="detail-side">
            <dl>
              <dt>时间</dt><dd>{p.period}</dd>
              <dt>单位</dt><dd>{p.org}</dd>
              <dt>角色</dt><dd>{p.role}</dd>
            </dl>
          </aside>
        </div>

        {(gallery.length > 1 || p.video) && (
          <section className="detail-gallery">
            <h2>图集与视频</h2>
            <div className="gallery-grid">
              {gallery.slice(1).map((g, k) => (
                <button key={g.src} className="gallery-item" onClick={() => setIdx(k + 1)}>
                  <img src={thumb(g.src)} alt={g.caption} loading="lazy" />
                  <span>{g.caption}</span>
                </button>
              ))}
              {p.video && (
                <div className="gallery-item video">
                  {playing ? (
                    <video src={asset(p.video.src)} controls autoPlay playsInline />
                  ) : (
                    <button onClick={() => setPlaying(true)} aria-label="播放视频">
                      <img src={thumb(p.video.poster)} alt="视频封面" loading="lazy" />
                      <i className="play">▶</i>
                    </button>
                  )}
                  <span>演示视频</span>
                </div>
              )}
            </div>
          </section>
        )}

        <nav className="detail-pager">
          <Link to={`/projects/${prev.slug}`}><small>上一个</small>{prev.title}</Link>
          <Link to={`/projects/${next.slug}`}><small>下一个</small>{next.title}</Link>
        </nav>
      </div>

      <Lightbox items={gallery} index={idx} onChange={setIdx} />
    </main>
  )
}

export default ProjectDetail
