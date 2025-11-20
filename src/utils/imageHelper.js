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
  // 或者：http://localhost:3000/images/project1-before.jpg -> /images/project1-before
  let basePath = ''
  let currentExt = ''
  
  // 尝试提取路径和扩展名
  const match1 = currentSrc.match(/(\/[^?]+)\.(jpg|jpeg|png)(\?.*)?$/i)
  if (match1) {
    basePath = match1[1]
    currentExt = match1[2].toLowerCase()
  } else {
    // 尝试从完整URL中提取
    const match2 = currentSrc.match(/(.+)\.(jpg|jpeg|png)(\?.*)?$/i)
    if (match2) {
      // 如果包含域名，提取路径部分
      const pathMatch = match2[1].match(/(\/images\/.+)$/i)
      if (pathMatch) {
        basePath = pathMatch[1]
      } else {
        basePath = match2[1]
      }
      currentExt = match2[2].toLowerCase()
    }
  }
  
  // 如果无法提取基础路径，尝试从src属性获取原始路径
  if (!basePath && img.getAttribute('src')) {
    const originalSrc = img.getAttribute('src')
    const origMatch = originalSrc.match(/(\/images\/[^\.]+)/)
    if (origMatch) {
      basePath = origMatch[1]
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
    const newSrc = `${basePath}.${nextFormat}`
    
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
