/**
 * 路径工具函数
 * 用于处理 GitHub Pages 部署时的资源路径问题
 * 自动添加 base path（如 /Astwea_SelfWeb/）
 */

/**
 * 获取正确的资源路径（自动添加 base path）
 * @param {string} path - 资源路径，例如 '/images/photo.jpg' 或 '/videos/video.mp4'
 * @returns {string} 完整的资源路径
 * 
 * @example
 * getAssetPath('/images/photo.jpg') // 在 GitHub Pages 上返回 '/Astwea_SelfWeb/images/photo.jpg'
 * getAssetPath('/videos/video.mp4') // 在 GitHub Pages 上返回 '/Astwea_SelfWeb/videos/video.mp4'
 */
export const getAssetPath = (path) => {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // 使用 Vite 的 BASE_URL，它会自动包含 base path（如 /Astwea_SelfWeb/）
  // 在开发环境中，BASE_URL 通常是 '/'
  // 在生产环境中，BASE_URL 是 vite.config.js 中配置的 base 值
  const baseUrl = import.meta.env.BASE_URL
  
  // 移除 baseUrl 末尾的斜杠（如果有），然后拼接路径
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`
  
  return `${cleanBaseUrl}${cleanPath}`
}

/**
 * 获取 PDF 文件路径
 * @param {string} filename - PDF 文件名，例如 '林森-机器人开发-简历.pdf'
 * @returns {string} 完整的 PDF 路径
 */
export const getPdfPath = (filename) => {
  return getAssetPath(`/${filename}`)
}

