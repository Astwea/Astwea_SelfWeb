import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from '../components/Lightbox'
import { profile, projects, experience, skillGroups, awards, life } from '../data/site'
import { asset, thumb } from '../utils/media'

const SectionHead = ({ id, kicker, title, desc }) => (
  <div className="section-head" id={id}>
    <span className="kicker">{kicker}</span>
    <h2>{title}</h2>
    {desc && <p>{desc}</p>}
  </div>
)

const Tags = ({ items, limit }) => (
  <ul className="tags">
    {(limit ? items.slice(0, limit) : items).map((t) => <li key={t}>{t}</li>)}
  </ul>
)

const Home = () => {
  const [awardIdx, setAwardIdx] = useState(null)
  const [lifeIdx, setLifeIdx] = useState(null)
  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <main>
      {/* 简介 */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="kicker">{profile.title}</span>
            <h1>{profile.name}</h1>
            <p className="lead">{profile.intro}</p>
            <Tags items={profile.focus} />
            <div className="hero-actions">
              <Link className="btn" to={{ pathname: '/', hash: '#projects' }}>查看项目</Link>
              <a className="btn btn-ghost" href={asset(profile.resume)} download>下载简历</a>
              <a className="btn btn-text" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>
          <div className="hero-photo">
            <img src={thumb(profile.photo)} alt={`${profile.name}的照片`} />
          </div>
        </div>
      </section>

      {/* 项目 */}
      <section className="section">
        <div className="container">
          <SectionHead id="projects" kicker="Projects" title="项目" desc="点击卡片查看项目详情、图集与视频" />

          <Link to={`/projects/${featured.slug}`} className="featured card">
            <div className="featured-media">
              <img src={featured.gif ? asset(featured.gif) : thumb(featured.cover)} alt={featured.title} />
            </div>
            <div className="featured-body">
              <div className="featured-info">
                <span className="meta">{featured.org} · {featured.period}</span>
                <h3>{featured.title}</h3>
                <p>{featured.short}</p>
                <Tags items={featured.tags} limit={6} />
              </div>
              <div className="featured-points">
                <ul className="checks">
                  {featured.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <span className="more">查看详情 →</span>
              </div>
            </div>
          </Link>

          <div className="project-grid">
            {others.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card card">
                <div className="project-thumb">
                  <img src={thumb(p.cover)} alt={p.title} loading="lazy" />
                </div>
                <div className="project-card-body">
                  <span className="meta">{p.org} · {p.period}</span>
                  <h3>{p.title}</h3>
                  <p>{p.short}</p>
                  <Tags items={p.tags} limit={3} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 经历 */}
      <section className="section section-soft">
        <div className="container">
          <SectionHead id="experience" kicker="Experience" title="经历" />
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.org}>
                <div className="timeline-date">{e.period}</div>
                <div className="timeline-body">
                  <h3>{e.org}</h3>
                  <span className="meta">{e.role}</span>
                  <ul>
                    {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 技能 */}
      <section className="section">
        <div className="container">
          <SectionHead id="skills" kicker="Skills" title="技能" />
          <div className="skill-grid">
            {skillGroups.map((g) => (
              <div key={g.title} className="skill-group">
                <h3>{g.title}</h3>
                <Tags items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 荣誉 */}
      <section className="section section-soft">
        <div className="container">
          <SectionHead id="awards" kicker="Awards" title="荣誉" desc="国家级一等奖 3 项、二等奖 1 项" />
          <ul className="award-list">
            {awards.map((a, i) => (
              <li key={a.name}>
                <button className="award-thumb" onClick={() => setAwardIdx(i)} aria-label={`查看证书：${a.name}`}>
                  <img src={thumb(a.image)} alt="" loading="lazy" />
                </button>
                <span className="award-year">{a.year}</span>
                <span className="award-name">{a.name}</span>
                <span className="award-level">{a.level}</span>
                <span className="award-role">{a.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 工作之外 */}
      <section className="section">
        <div className="container">
          <SectionHead id="life" kicker="Life" title="工作之外" />
          <div className="life-grid">
            {life.map((l, i) => (
              <button key={l.src} className="life-item" onClick={() => setLifeIdx(i)}>
                <img src={thumb(l.src)} alt={l.caption} loading="lazy" />
                <span>{l.caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 联系 */}
      <section className="section section-soft">
        <div className="container">
          <SectionHead id="contact" kicker="Contact" title="联系我" desc="工作机会或技术交流，都欢迎联系" />
          <div className="contact">
            <ul className="contact-list">
              <li><span>邮箱</span><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><span>电话</span><a href={`tel:${profile.phone}`}>{profile.phone}</a></li>
              <li><span>微信</span>{profile.wechat}</li>
              <li><span>GitHub</span><a href={profile.github} target="_blank" rel="noopener noreferrer">github.com/Astwea</a></li>
            </ul>
            <a className="resume-card card" href={asset(profile.resume)} download>
              <img src={thumb(profile.resumeCover)} alt="简历首页预览" loading="lazy" />
              <div>
                <strong>下载完整简历（PDF）</strong>
                <span>更新于 {profile.updated}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Lightbox
        items={awards.map((a) => ({ src: a.image, caption: `${a.year} ${a.name} · ${a.level}` }))}
        index={awardIdx}
        onChange={setAwardIdx}
      />
      <Lightbox items={life} index={lifeIdx} onChange={setLifeIdx} />
    </main>
  )
}

export default Home
