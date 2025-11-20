/**
 * 图片格式兼容工具函数
 * 自动尝试多种格式的图片路径（jpg, png, jpeg）
 */

/**
 * 处理图片加载错误的函数（自动尝试其他格式）
 * 优先尝试：jpg -> png -> jpeg，最后显示占位符
 * @param {Event} e - 图片加载错误事件
 * @param {Function} getPlaceholder - 获取占位符的函数（可选）
 */
export const handleImageError = (e, getPlaceholder = null) => {
  const img = e.target
  const currentSrc = img.src
  
  // 防止无限循环
  if (!img.dataset.retryAttempts) {
    img.dataset.retryAttempts = '0'
  }
  const retryAttempts = parseInt(img.dataset.retryAttempts) || 0
  if (retryAttempts >= 3) {
    // 已经尝试过3次了，使用占位符
    if (getPlaceholder) {
      img.src = getPlaceholder(img.alt || '图片')
    }
    return
  }
  
  // 从当前路径提取基础路径（不含扩展名）
  // 例如：/images/project1-before.jpg -> /images/project1-before
  // 或者：http://localhost:3000/Astwea_SelfWeb/images/project1-before.jpg -> /Astwea_SelfWeb/images/project1-before
  let basePath = ''
  let currentExt = ''
  
  // 首先尝试从 src 属性获取原始路径（可能包含 base path）
  const originalSrc = img.getAttribute('src') || currentSrc
  
  // 尝试提取路径和扩展名（支持包含 base path 的情况）
  // 匹配模式：/base/path/images/file.jpg 或 /images/file.jpg
  const match1 = originalSrc.match(/(\/[^?]+)\.(jpg|jpeg|png)(\?.*)?$/i)
  if (match1) {
    basePath = match1[1]
    currentExt = match1[2].toLowerCase()
  } else {
    // 尝试从完整URL中提取（包含域名的情况）
    const match2 = currentSrc.match(/(https?:\/\/[^\/]+)?(\/.+?)\.(jpg|jpeg|png)(\?.*)?$/i)
    if (match2) {
      basePath = match2[2] || match2[1]
      currentExt = (match2[3] || match2[2]).toLowerCase()
    }
  }
  
  // 如果仍然无法提取，尝试从原始路径中提取（不包含扩展名）
  if (!basePath && originalSrc) {
    // 尝试匹配 /images/xxx 或 /Astwea_SelfWeb/images/xxx 格式
    const pathMatch = originalSrc.match(/(\/[^\/]+\/images\/[^\.]+)/i) || 
                      originalSrc.match(/(\/images\/[^\.]+)/i)
    if (pathMatch) {
      basePath = pathMatch[1]
    }
  }
  
  if (!basePath) {
    // 无法提取，直接使用占位符
    if (getPlaceholder) {
      img.src = getPlaceholder(img.alt || '图片')
    }
    return
  }
  
  // 格式尝试顺序：jpg -> png -> jpeg
  const formats = ['jpg', 'png', 'jpeg']
  
  // 检查是否已经尝试过所有格式（通过data属性记录）
  let triedFormats = (img.dataset.triedFormats || '').split(',').filter(f => f.trim())
  if (!triedFormats.includes(currentExt) && currentExt) {
    triedFormats.push(currentExt)
    img.dataset.triedFormats = triedFormats.join(',')
  }
  
  // 尝试下一个未尝试过的格式
  const remainingFormats = formats.filter(f => !triedFormats.includes(f))
  
  if (remainingFormats.length > 0) {
    const nextFormat = remainingFormats[0]
    
    // 构建新的路径，保持原有的 base path
    // basePath 应该已经包含了完整的路径（包括 base path，如果有的话）
    let newSrc = `${basePath}.${nextFormat}`
    
    // 如果 basePath 不包含 base path，但原始路径包含，需要添加 base path
    // 检查原始路径是否包含 /Astwea_SelfWeb/
    if (originalSrc.includes('/Astwea_SelfWeb/') && !basePath.includes('/Astwea_SelfWeb/')) {
      // 从原始路径中提取 base path 部分
      const baseMatch = originalSrc.match(/(\/Astwea_SelfWeb\/)/)
      if (baseMatch) {
        // 确保 basePath 以 / 开头（移除开头的 /，因为 baseMatch[1] 已经包含）
        const pathWithoutSlash = basePath.startsWith('/') ? basePath.slice(1) : basePath
        newSrc = `${baseMatch[1]}${pathWithoutSlash}.${nextFormat}`
      }
    }
    
    // 记录已尝试的格式和重试次数
    triedFormats.push(nextFormat)
    img.dataset.triedFormats = triedFormats.join(',')
    img.dataset.retryAttempts = (retryAttempts + 1).toString()
    
    // 尝试加载新格式
    img.src = newSrc
    return
  }
  
  // 所有格式都尝试过了，使用占位符
  if (getPlaceholder) {
    img.src = getPlaceholder(img.alt || '图片')
  } else {
    // 默认占位符
    img.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E`
  }
}

/**
 * 创建图片错误处理函数（带自定义占位符）
 * @param {Function} getPlaceholder - 获取占位符的函数
 * @returns {Function} 错误处理函数
 */
export const createImageErrorHandler = (getPlaceholder) => {
  return (e) => handleImageError(e, getPlaceholder)
}
