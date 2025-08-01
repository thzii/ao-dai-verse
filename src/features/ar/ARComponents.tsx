import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, PresentationControls } from '@react-three/drei'
import { 
  Camera, 
  CameraOff, 
  Settings, 
  Sparkles, 
  Palette, 
  Heart, 
  Star,
  RotateCcw,
  Download,
  Share2,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Zap
} from 'lucide-react'
import { AR_LIGHTING, AR_BACKGROUND, AR_QUALITY, AR_TRACKING } from '../../constants'

interface ARSettings {
  lighting: keyof typeof AR_LIGHTING
  background: keyof typeof AR_BACKGROUND
  quality: keyof typeof AR_QUALITY
  tracking: keyof typeof AR_TRACKING
}

interface AoDaiModel {
  id: string
  name: string
  modelUrl: string
  thumbnail: string
  style: string
  colors: string[]
  patterns: string[]
}

// 3D Model Component
const AoDaiModel3D = ({ modelUrl, color, pattern }: { modelUrl: string; color: string; pattern: string }) => {
  const { scene } = useGLTF(modelUrl)
  
  useEffect(() => {
    // Apply color and pattern to the model
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.color.setHex(parseInt(color.replace('#', ''), 16))
      }
    })
  }, [scene, color, pattern])

  return <primitive object={scene} />
}

// AR Try-On Component
export const ARTryOn = () => {
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [selectedAoDai, setSelectedAoDai] = useState<AoDaiModel | null>(null)
  const [arSettings, setARSettings] = useState<ARSettings>({
    lighting: 'natural',
    background: 'real',
    quality: 'high',
    tracking: 'body'
  })
  const [isRecording, setIsRecording] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock data
  const aoDaiModels: AoDaiModel[] = [
    {
      id: '1',
      name: 'Áo Dài Ngũ Thân Hoa Sen',
      modelUrl: '/models/aodai-ngu-than.glb',
      thumbnail: '/images/models/ngu-than-thumb.jpg',
      style: 'ngu-than',
      colors: ['#dc2626', '#eab308', '#7c3aed', '#ec4899'],
      patterns: ['hoa-sen', 'lan', 'mai', 'cuc']
    },
    {
      id: '2',
      name: 'Áo Dài Cung Đình Huế',
      modelUrl: '/models/aodai-cung-dinh.glb',
      thumbnail: '/images/models/cung-dinh-thumb.jpg',
      style: 'cung-dinh',
      colors: ['#dc2626', '#eab308', '#7c3aed', '#16a34a'],
      patterns: ['rong-phuong', 'hoa-cuc', 'hoa-mai', 'hoa-dao']
    }
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOn(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
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

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Implement recording logic here
  }

  const captureScreenshot = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        ctx.drawImage(videoRef.current, 0, 0)
        
        // Download the image
        const link = document.createElement('a')
        link.download = 'ao-dai-try-on.png'
        link.href = canvas.toDataURL()
        link.click()
      }
    }
  }

  const shareExperience = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Thử áo dài ảo với Áo DàiVerse',
        text: 'Khám phá thiết kế áo dài mới của tôi!',
        url: window.location.href
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Thử Áo Dài Ảo</h1>
              <p className="text-gray-300 text-sm">Trải nghiệm AR với camera</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Main AR View */}
        <div className="flex-1 relative">
          {/* Camera Feed */}
          <div className="relative w-full h-full bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* AR Overlay */}
            {selectedAoDai && (
              <div className="absolute inset-0 pointer-events-none">
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 75 }}
                  className="w-full h-full"
                >
                  <Environment preset="sunset" />
                  <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, -Math.PI / 4, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <AoDaiModel3D
                      modelUrl={selectedAoDai.modelUrl}
                      color="#dc2626"
                      pattern="hoa-sen"
                    />
                  </PresentationControls>
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
              </div>
            )}

            {/* AR Controls Overlay */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={isCameraOn ? stopCamera : startCamera}
                  className={`p-3 rounded-full ${
                    isCameraOn 
                      ? 'bg-red-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {isCameraOn ? <CameraOff className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleRecording}
                  className={`p-3 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/20 text-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${
                    isRecording ? 'bg-white' : 'border-2 border-white'
                  }`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={captureScreenshot}
                  className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                >
                  <Download className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={shareExperience}
                  className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Hidden canvas for screenshots */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            {/* Ao Dai Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn Áo Dài</h3>
              <div className="space-y-3">
                {aoDaiModels.map((model) => (
                  <motion.div
                    key={model.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedAoDai(model)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedAoDai?.id === model.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={model.thumbnail}
                        alt={model.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-500">{model.style}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {selectedAoDai && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Màu sắc</h3>
                <div className="grid grid-cols-4 gap-3">
                  {selectedAoDai.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pattern Selection */}
            {selectedAoDai && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Họa tiết</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedAoDai.patterns.map((pattern) => (
                    <motion.button
                      key={pattern}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {pattern.replace('-', ' ')}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* AR Settings */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt AR</h3>
              
              {/* Lighting */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ánh sáng</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(AR_LIGHTING).map(([key, value]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setARSettings({ ...arSettings, lighting: key as any })}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        arSettings.lighting === key
                          ? 'bg-pink-100 text-pink-700 border-pink-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {key === 'natural' && <Sun className="w-4 h-4 mx-auto mb-1" />}
                      {key === 'studio' && <Zap className="w-4 h-4 mx-auto mb-1" />}
                      {key === 'outdoor' && <Moon className="w-4 h-4 mx-auto mb-1" />}
                      {value}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nền</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(AR_BACKGROUND).map(([key, value]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setARSettings({ ...arSettings, background: key as any })}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        arSettings.background === key
                          ? 'bg-pink-100 text-pink-700 border-pink-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chất lượng</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(AR_QUALITY).map(([key, value]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setARSettings({ ...arSettings, quality: key as any })}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        arSettings.quality === key
                          ? 'bg-pink-100 text-pink-700 border-pink-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Âm thanh</h3>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-lg ${
                    isMuted 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>
                <span className="text-sm text-gray-600">
                  {isMuted ? 'Tắt âm thanh' : 'Bật âm thanh'}
                </span>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Mẹo sử dụng</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Đảm bảo ánh sáng đủ sáng</li>
                <li>• Giữ khoảng cách 1-2m với camera</li>
                <li>• Di chuyển chậm để tracking tốt hơn</li>
                <li>• Có thể thay đổi màu sắc và họa tiết</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3D Preview Component
export const ThreeDPreview = ({ modelUrl, color, pattern }: { modelUrl: string; color: string; pattern: string }) => {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Environment preset="studio" />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <AoDaiModel3D modelUrl={modelUrl} color={color} pattern={pattern} />
        </PresentationControls>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}

export default ARTryOn 