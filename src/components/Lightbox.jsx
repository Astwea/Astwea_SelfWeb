import React, { useEffect } from 'react'
import { asset } from '../utils/media'

/** 图片大图查看：items = [{ src, caption }]，index 为当前下标，null 表示关闭 */
const Lightbox = ({ items, index, onChange }) => {
  const open = index !== null && index !== undefined
  const count = items.length

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, count, onChange])

  if (!open) return null
  const item = items[index]

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={() => onChange(null)}>
      <button className="lightbox-close" aria-label="关闭" onClick={() => onChange(null)}>×</button>
      {count > 1 && (
        <button
          className="lightbox-nav prev"
          aria-label="上一张"
          onClick={(e) => { e.stopPropagation(); onChange((index - 1 + count) % count) }}
        >‹</button>
      )}
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={asset(item.src)} alt={item.caption || ''} />
        {item.caption && <figcaption>{item.caption}{count > 1 && <span> · {index + 1}/{count}</span>}</figcaption>}
      </figure>
      {count > 1 && (
        <button
          className="lightbox-nav next"
          aria-label="下一张"
          onClick={(e) => { e.stopPropagation(); onChange((index + 1) % count) }}
        >›</button>
      )}
    </div>
  )
}

export default Lightbox
