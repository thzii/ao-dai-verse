import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  CameraOff, 
  Share2, 
  Settings,
  Sparkles,
  Palette,
  Heart,
  Star
} from 'lucide-react'

const ARTryOnPage = () => {
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [selectedAoDai, setSelectedAoDai] = useState<any>(null)
  const [isRecording, setIsRecording] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const aoDaiOptions = [
    {
      id: 1,
      name: 'Áo dài cung đình Huế',
      image: '👑',
      color: '#dc2626',
      pattern: 'Phượng hoàng',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Áo dài cách tân',
      image: '⭐',
      color: '#7c3aed',
      pattern: 'Geometric',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Áo dài học sinh',
      image: '🎓',
      color: '#ffffff',
      pattern: 'Trắng tinh khôi',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Áo dài cưới',
      image: '💕',
      color: '#ec4899',
      pattern: 'Hoa sen',
      rating: 4.9
    }
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOn(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsCameraOn(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'ao-dai-ar-photo.jpg'
            a.click()
            URL.revokeObjectURL(url)
          }
        }, 'image/jpeg')
      }
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">AR Thử áo dài</h1>
              <p className="text-gray-300">Thử áo dài ảo trên cơ thể thật</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              
              <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Camera View */}
        <div className="flex-1 relative">
          <div className="w-full h-full bg-black relative overflow-hidden">
            {/* Camera Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Camera Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isCameraOn ? (
                <div className="text-center text-white">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-4">Nhấn để bật camera</p>
                  <button
                    onClick={startCamera}
                    className="btn-primary"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Bật camera
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* AR Overlay for Ao Dai */}
                  {selectedAoDai && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Placeholder for AR Ao Dai rendering */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-32 h-48 bg-gradient-to-b from-red-400 to-red-600 rounded-t-full relative opacity-80">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-red-500 rounded-t-full"></div>
                          <div className="absolute top-8 left-0 w-6 h-20 bg-red-400 rounded-r-full"></div>
                          <div className="absolute top-8 right-0 w-6 h-20 bg-red-400 rounded-l-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Camera Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                    <button
                      onClick={stopCamera}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <CameraOff className="h-6 w-6" />
                    </button>
                    
                    <button
                      onClick={capturePhoto}
                      className="p-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Camera className="h-8 w-8" />
                    </button>
                    
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-3 rounded-full transition-colors ${
                        isRecording 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${isRecording ? 'bg-white' : 'border-2 border-white'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Right Panel - Ao Dai Selection */}
        <div className="w-80 bg-white/10 backdrop-blur-md border-l border-white/20 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Chọn áo dài để thử</h3>
            
            <div className="space-y-4">
              {aoDaiOptions.map((aoDai) => (
                <motion.div
                  key={aoDai.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedAoDai?.id === aoDai.id
                      ? 'bg-white/20 border-2 border-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  onClick={() => setSelectedAoDai(aoDai)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{aoDai.image}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{aoDai.name}</h4>
                      <p className="text-sm text-gray-300">{aoDai.pattern}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-300">{aoDai.rating}</span>
                      </div>
                    </div>
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white"
                      style={{ backgroundColor: aoDai.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-3">
              <h4 className="font-medium text-white mb-3">Thao tác nhanh</h4>
              
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all">
                <Palette className="h-4 w-4" />
                <span>Tùy chỉnh màu sắc</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                <Heart className="h-4 w-4" />
                <span>Lưu vào bộ sưu tập</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                <Share2 className="h-4 w-4" />
                <span>Chia sẻ</span>
              </button>
            </div>

            {/* Tips */}
            <div className="mt-8 p-4 bg-blue-500/20 rounded-lg">
              <h4 className="font-medium text-white mb-2">💡 Mẹo sử dụng</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Đứng cách camera 2-3 mét</li>
                <li>• Đảm bảo ánh sáng đủ sáng</li>
                <li>• Giữ nguyên tư thế để thử áo</li>
                <li>• Có thể xoay người để xem các góc</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ARTryOnPage 