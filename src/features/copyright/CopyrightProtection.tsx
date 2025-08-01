import React, { useState, useRef, useEffect } from 'react'
import des1 from '../../assets/des1.jpg'
import des2 from '../../assets/des2.jpg'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Download, 
  Share2, 
  Copy, 
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  Camera,
  CameraOff,
  Settings,
  Save,
  Trash2,
  Edit,
  Plus,
  Minus,
  RotateCw,
  Palette,
  Type,
  Image as ImageIcon
} from 'lucide-react'
import { WATERMARK_TYPES, WATERMARK_POSITIONS, COPYRIGHT_LICENSES } from '../../constants'

interface WatermarkConfig {
  enabled: boolean
  type: keyof typeof WATERMARK_TYPES
  content: string
  position: keyof typeof WATERMARK_POSITIONS
  opacity: number
  rotation: number
  fontSize: number
  color: string
  backgroundColor: string
}

interface CopyrightInfo {
  owner: string
  creationDate: Date
  license: keyof typeof COPYRIGHT_LICENSES
  terms: string
  watermark: WatermarkConfig
  tracking: {
    screenshotProtection: boolean
    downloadProtection: boolean
    viewTracking: boolean
    shareTracking: boolean
  }
}

interface DesignImage {
  id: string
  url: string
  originalUrl: string
  watermark: WatermarkConfig
  copyright: CopyrightInfo
  analytics: {
    views: number
    downloads: number
    shares: number
    uniqueVisitors: number
    timeSpent: number
  }
}

export const CopyrightProtection = () => {
  const [selectedImage, setSelectedImage] = useState<DesignImage | null>(null)
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
    enabled: true,
    type: 'text',
    content: '© Áo DàiVerse 2024',
    position: 'bottom-right',
    opacity: 0.7,
    rotation: -15,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)'
  })
  const [copyrightInfo, setCopyrightInfo] = useState<CopyrightInfo>({
    owner: 'Nguyễn Thị Mai',
    creationDate: new Date(),
    license: 'all-rights-reserved',
    terms: 'Bản quyền thuộc về tác giả. Không được sao chép, phân phối hoặc sử dụng mà không có sự cho phép.',
    watermark: watermarkConfig,
    tracking: {
      screenshotProtection: true,
      downloadProtection: true,
      viewTracking: true,
      shareTracking: true
    }
  })
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Mock data
  const designImages: DesignImage[] = [
    {
      id: '1',
      url: des1,
      originalUrl: '/images/designs/design1-original.jpg',
      watermark: watermarkConfig,
      copyright: copyrightInfo,
      analytics: {
        views: 156,
        downloads: 23,
        shares: 8,
        uniqueVisitors: 89,
        timeSpent: 45
      }
    },
    {
      id: '2',
      url: des2,
      originalUrl: '/images/designs/design2-original.jpg',
      watermark: watermarkConfig,
      copyright: copyrightInfo,
      analytics: {
        views: 234,
        downloads: 45,
        shares: 12,
        uniqueVisitors: 156,
        timeSpent: 67
      }
    }
  ]

  // Screenshot protection
  useEffect(() => {
    if (copyrightInfo.tracking.screenshotProtection) {
      const preventScreenshot = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
          e.preventDefault()
          alert('Chụp màn hình và lưu trang đã bị vô hiệu hóa để bảo vệ bản quyền.')
        }
      }

      const preventContextMenu = (e: MouseEvent) => {
        e.preventDefault()
      }

      const preventDrag = (e: DragEvent) => {
        e.preventDefault()
      }

      document.addEventListener('keydown', preventScreenshot)
      document.addEventListener('contextmenu', preventContextMenu)
      document.addEventListener('dragstart', preventDrag)

      return () => {
        document.removeEventListener('keydown', preventScreenshot)
        document.removeEventListener('contextmenu', preventContextMenu)
        document.removeEventListener('dragstart', preventDrag)
      }
    }
  }, [copyrightInfo.tracking.screenshotProtection])

  // Apply watermark to image
  const applyWatermark = (imageUrl: string, config: WatermarkConfig): string => {
    if (!config.enabled) return imageUrl

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imageRef.current

    if (!canvas || !ctx || !img) return imageUrl

    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      // Draw original image
      ctx.drawImage(img, 0, 0)

      // Apply watermark
      if (config.type === 'text') {
        ctx.save()
        ctx.globalAlpha = config.opacity
        ctx.font = `${config.fontSize}px Arial`
        ctx.fillStyle = config.color
        ctx.strokeStyle = config.backgroundColor
        ctx.lineWidth = 2

        const text = config.content
        const textMetrics = ctx.measureText(text)
        const textWidth = textMetrics.width
        const textHeight = config.fontSize

        let x = 0
        let y = 0

        // Calculate position
        switch (config.position) {
          case 'top-left':
            x = 20
            y = textHeight + 20
            break
          case 'top-right':
            x = canvas.width - textWidth - 20
            y = textHeight + 20
            break
          case 'bottom-left':
            x = 20
            y = canvas.height - 20
            break
          case 'bottom-right':
            x = canvas.width - textWidth - 20
            y = canvas.height - 20
            break
          case 'center':
            x = (canvas.width - textWidth) / 2
            y = canvas.height / 2
            break
        }

        // Rotate and draw text
        ctx.translate(x + textWidth / 2, y - textHeight / 2)
        ctx.rotate((config.rotation * Math.PI) / 180)
        ctx.strokeText(text, -textWidth / 2, textHeight / 2)
        ctx.fillText(text, -textWidth / 2, textHeight / 2)
        ctx.restore()
      }

      // Convert to data URL
      return canvas.toDataURL('image/jpeg', 0.9)
    }

    img.src = imageUrl
    return imageUrl
  }

  const generateWatermarkedImage = () => {
    if (selectedImage) {
      const watermarkedUrl = applyWatermark(selectedImage.originalUrl, watermarkConfig)
      // Update the image URL with watermark
      setSelectedImage({
        ...selectedImage,
        url: watermarkedUrl,
        watermark: watermarkConfig
      })
    }
  }

  const downloadImage = (image: DesignImage) => {
    if (copyrightInfo.tracking.downloadProtection) {
      alert('Tính năng tải xuống đã bị vô hiệu hóa để bảo vệ bản quyền.')
      return
    }

    const link = document.createElement('a')
    link.download = `ao-dai-design-${image.id}.jpg`
    link.href = image.url
    link.click()
  }

  const shareImage = (image: DesignImage) => {
    if (navigator.share) {
      navigator.share({
        title: 'Thiết kế áo dài từ Áo DàiVerse',
        text: 'Khám phá thiết kế áo dài độc đáo này!',
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link đã được sao chép vào clipboard!')
    }
  }

  const copyImageUrl = (image: DesignImage) => {
    navigator.clipboard.writeText(image.url)
    alert('URL hình ảnh đã được sao chép!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bảo Vệ Bản Quyền</h1>
              <p className="text-gray-600 mt-1">Bảo vệ thiết kế của bạn với watermark và tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(!showSettings)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
                Cài đặt
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Thiết Kế Của Bạn</h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`p-2 rounded-lg ${
                      isPreviewMode 
                        ? 'bg-pink-100 text-pink-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isPreviewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {designImages.map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={isPreviewMode ? image.originalUrl : image.url}
                        alt={`Design ${image.id}`}
                        className="w-full h-64 object-cover"
                        draggable={false}
                      />
                      
                      {/* Protection overlay */}
                      {copyrightInfo.tracking.screenshotProtection && (
                        <div className="absolute inset-0 bg-transparent pointer-events-none">
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            <Lock className="w-3 h-3 inline mr-1" />
                            Protected
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="absolute bottom-2 right-2 flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => downloadImage(image)}
                          className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => shareImage(image)}
                          className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                        >
                          <Share2 className="w-4 h-4 text-gray-700" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyImageUrl(image)}
                          className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                        >
                          <Copy className="w-4 h-4 text-gray-700" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Lượt xem:</span>
                          <span className="font-medium ml-2">{image.analytics.views}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tải xuống:</span>
                          <span className="font-medium ml-2">{image.analytics.downloads}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Chia sẻ:</span>
                          <span className="font-medium ml-2">{image.analytics.shares}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Khách:</span>
                          <span className="font-medium ml-2">{image.analytics.uniqueVisitors}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="lg:col-span-1">
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-sm p-6 space-y-6"
              >
                {/* Watermark Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài Đặt Watermark</h3>
                  
                  <div className="space-y-4">
                    {/* Enable/Disable */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Bật watermark</span>
                      <button
                        onClick={() => setWatermarkConfig({ ...watermarkConfig, enabled: !watermarkConfig.enabled })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          watermarkConfig.enabled ? 'bg-pink-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            watermarkConfig.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Watermark Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loại watermark</label>
                      <select
                        value={watermarkConfig.type}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, type: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="text">Văn bản</option>
                        <option value="image">Hình ảnh</option>
                        <option value="dynamic">Động</option>
                      </select>
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                      <input
                        type="text"
                        value={watermarkConfig.content}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, content: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Nhập nội dung watermark"
                      />
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí</label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(WATERMARK_POSITIONS).map(([key, value]) => (
                          <motion.button
                            key={key}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setWatermarkConfig({ ...watermarkConfig, position: key as any })}
                            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                              watermarkConfig.position === key
                                ? 'bg-pink-100 text-pink-700 border-pink-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {value}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Opacity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Độ trong suốt: {watermarkConfig.opacity}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={watermarkConfig.opacity}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, opacity: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* Rotation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Góc xoay: {watermarkConfig.rotation}°
                      </label>
                      <input
                        type="range"
                        min="-45"
                        max="45"
                        step="5"
                        value={watermarkConfig.rotation}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, rotation: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cỡ chữ: {watermarkConfig.fontSize}px
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="48"
                        step="2"
                        value={watermarkConfig.fontSize}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, fontSize: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Màu chữ</label>
                      <input
                        type="color"
                        value={watermarkConfig.color}
                        onChange={(e) => setWatermarkConfig({ ...watermarkConfig, color: e.target.value })}
                        className="w-full h-10 rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Protection Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài Đặt Bảo Vệ</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Chặn chụp màn hình</span>
                      <button
                        onClick={() => setCopyrightInfo({
                          ...copyrightInfo,
                          tracking: {
                            ...copyrightInfo.tracking,
                            screenshotProtection: !copyrightInfo.tracking.screenshotProtection
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          copyrightInfo.tracking.screenshotProtection ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            copyrightInfo.tracking.screenshotProtection ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Chặn tải xuống</span>
                      <button
                        onClick={() => setCopyrightInfo({
                          ...copyrightInfo,
                          tracking: {
                            ...copyrightInfo.tracking,
                            downloadProtection: !copyrightInfo.tracking.downloadProtection
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          copyrightInfo.tracking.downloadProtection ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            copyrightInfo.tracking.downloadProtection ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Theo dõi lượt xem</span>
                      <button
                        onClick={() => setCopyrightInfo({
                          ...copyrightInfo,
                          tracking: {
                            ...copyrightInfo.tracking,
                            viewTracking: !copyrightInfo.tracking.viewTracking
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          copyrightInfo.tracking.viewTracking ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            copyrightInfo.tracking.viewTracking ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Theo dõi chia sẻ</span>
                      <button
                        onClick={() => setCopyrightInfo({
                          ...copyrightInfo,
                          tracking: {
                            ...copyrightInfo.tracking,
                            shareTracking: !copyrightInfo.tracking.shareTracking
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          copyrightInfo.tracking.shareTracking ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            copyrightInfo.tracking.shareTracking ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateWatermarkedImage}
                    className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Áp dụng
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setWatermarkConfig({
                      enabled: true,
                      type: 'text',
                      content: '© Áo DàiVerse 2024',
                      position: 'bottom-right',
                      opacity: 0.7,
                      rotation: -15,
                      fontSize: 16,
                      color: '#ffffff',
                      backgroundColor: 'rgba(0,0,0,0.5)'
                    })}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Hidden canvas for watermark processing */}
        <canvas ref={canvasRef} className="hidden" />
        <img ref={imageRef} className="hidden" />
      </div>
    </div>
  )
}

export default CopyrightProtection 