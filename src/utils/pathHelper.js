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
  let baseUrl = import.meta.env.BASE_URL
  
  // 确保 baseUrl 存在且有效
  if (!baseUrl || baseUrl === 'undefined') {
    // 如果 BASE_URL 未定义，尝试从 vite.config.js 中读取
    // 或者使用默认值
    baseUrl = '/Astwea_SelfWeb/'
  }
  
  // 确保 baseUrl 以 / 开头和结尾
  if (!baseUrl.startsWith('/')) {
    baseUrl = '/' + baseUrl
  }
  if (!baseUrl.endsWith('/')) {
    baseUrl = baseUrl + '/'
  }
  
  // 移除路径开头的斜杠（因为 baseUrl 已经以 / 结尾）
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath
  
  return `${baseUrl}${cleanPath}`
}

/**
 * 获取 PDF 文件路径
 * @param {string} filename - PDF 文件名，例如 '林森-机器人开发-简历.pdf'
 * @returns {string} 完整的 PDF 路径
 */
export const getPdfPath = (filename) => {
  return getAssetPath(`/${filename}`)
}

