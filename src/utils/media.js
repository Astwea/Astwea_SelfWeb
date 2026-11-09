import { getAssetPath } from './pathHelper'

/** public/ 下资源的完整路径（自动加 base path） */
export const asset = (src) => getAssetPath(src)

/** 缩略图路径：/images/a/b.png -> /images/thumbs/b.jpg（由 scripts/make-thumbs.py 生成）；GIF 不做缩略图 */
export const thumb = (src) => {
  if (!src || src.endsWith('.gif')) return asset(src)
  const name = src.split('/').pop().split('.')[0]
  return asset(`/images/thumbs/${name}.jpg`)
}
