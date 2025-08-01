import { format, formatDistance, formatRelative, isValid } from 'date-fns'
import { vi, enUS } from 'date-fns/locale'

// Number formatting
export const formatNumber = (num: number, locale: string = 'vi-VN'): string => {
  return new Intl.NumberFormat(locale).format(num)
}

export const formatDecimal = (num: number, decimals: number = 2, locale: string = 'vi-VN'): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export const formatPercentage = (num: number, decimals: number = 1, locale: string = 'vi-VN'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num / 100)
}

export const formatCurrency = (amount: number, currency: string = 'VND', locale: string = 'vi-VN'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatCompactNumber = (num: number, locale: string = 'vi-VN'): string => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num)
}

// Date formatting
export const formatDate = (date: Date | string, formatStr: string = 'dd/MM/yyyy', locale: string = 'vi'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid date'
  }
  
  const localeObj = locale === 'vi' ? vi : enUS
  
  return format(dateObj, formatStr, { locale: localeObj })
}

export const formatDateTime = (date: Date | string, formatStr: string = 'dd/MM/yyyy HH:mm', locale: string = 'vi'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid date'
  }
  
  const localeObj = locale === 'vi' ? vi : enUS
  
  return format(dateObj, formatStr, { locale: localeObj })
}

export const formatRelativeTime = (date: Date | string, baseDate: Date = new Date(), locale: string = 'vi'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid date'
  }
  
  const localeObj = locale === 'vi' ? vi : enUS
  
  return formatRelative(dateObj, baseDate, { locale: localeObj })
}

export const formatDistanceToNow = (date: Date | string, locale: string = 'vi'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid date'
  }
  
  const localeObj = locale === 'vi' ? vi : enUS
  
  return formatDistance(dateObj, new Date(), { locale: localeObj, addSuffix: true })
}

// Text formatting
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (str.length <= length) return str
  return str.substring(0, length) + suffix
}

export const truncateWords = (str: string, wordCount: number, suffix: string = '...'): string => {
  const words = str.split(' ')
  if (words.length <= wordCount) return str
  return words.slice(0, wordCount).join(' ') + suffix
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const camelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export const snakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

export const titleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

// Phone number formatting
export const formatPhoneNumber = (phone: string, format: string = 'VN'): string => {
  const clean = phone.replace(/\D/g, '')
  
  if (format === 'VN') {
    if (clean.startsWith('84')) {
      return `+${clean}`
    }
    if (clean.startsWith('0')) {
      return `+84${clean.slice(1)}`
    }
    return clean
  }
  
  return clean
}

export const formatPhoneNumberDisplay = (phone: string): string => {
  const clean = phone.replace(/\D/g, '')
  
  if (clean.startsWith('84')) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5, 8)} ${clean.slice(8)}`
  }
  
  if (clean.startsWith('0')) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`
  }
  
  return clean
}

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Duration formatting
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export const formatDurationWords = (seconds: number, locale: string = 'vi'): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (locale === 'vi') {
    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`
    }
    return `${minutes} phút`
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

// Credit card formatting
export const formatCreditCard = (cardNumber: string): string => {
  const clean = cardNumber.replace(/\D/g, '')
  const groups = clean.match(/.{1,4}/g)
  return groups ? groups.join(' ') : clean
}

export const maskCreditCard = (cardNumber: string): string => {
  const clean = cardNumber.replace(/\D/g, '')
  if (clean.length < 4) return clean
  
  const last4 = clean.slice(-4)
  const masked = '*'.repeat(clean.length - 4)
  return masked + last4
}

// Vietnamese specific formatting
export const formatVietnameseName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatVietnameseAddress = (address: string): string => {
  return address
    .split(',')
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .join(', ')
}

export const formatVietnameseCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatVietnameseDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (!isValid(dateObj)) {
    return 'Ngày không hợp lệ'
  }
  
  return format(dateObj, 'dd/MM/yyyy', { locale: vi })
}

export const formatVietnameseDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (!isValid(dateObj)) {
    return 'Ngày không hợp lệ'
  }
  
  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: vi })
}

// Color formatting
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  s /= 100
  l /= 100
  
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

// URL formatting
export const formatUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url
  }
  return url
}

export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(formatUrl(url))
    return urlObj.hostname
  } catch {
    return url
  }
}

// Social media formatting
export const formatSocialMediaHandle = (handle: string, platform: string): string => {
  const clean = handle.replace(/^@/, '')
  
  switch (platform.toLowerCase()) {
    case 'instagram':
    case 'twitter':
    case 'tiktok':
      return `@${clean}`
    case 'facebook':
      return clean
    case 'youtube':
      return clean
    default:
      return clean
  }
}

// Vietnamese number words
export const numberToVietnameseWords = (num: number): string => {
  const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
  const teens = ['mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín']
  const tens = ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi']
  
  if (num === 0) return 'không'
  if (num < 10) return units[num]
  if (num < 20) return teens[num - 10]
  if (num < 100) {
    const unit = num % 10
    const ten = Math.floor(num / 10)
    if (unit === 0) return tens[ten]
    if (unit === 1) return `${tens[ten]} mốt`
    if (unit === 5) return `${tens[ten]} lăm`
    return `${tens[ten]} ${units[unit]}`
  }
  
  // For larger numbers, you would need more complex logic
  return num.toString()
} 