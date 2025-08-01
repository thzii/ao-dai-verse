import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Camera, 
  Download, 
  Share2, 
  Heart,
  RotateCcw,
  Settings,
  Sparkles
} from 'lucide-react'
import DesignerCanvas from '../components/designer/DesignerCanvas'
import DesignerPanel from '../components/designer/DesignerPanel'
import AISuggestions from '../components/designer/AISuggestions'

const DesignerPage = () => {
  const [selectedTool, setSelectedTool] = useState('style')
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  const tools = [
    { id: 'style', name: 'Kiểu áo', icon: Palette },
    { id: 'fabric', name: 'Chất liệu', icon: Settings },
    { id: 'pattern', name: 'Họa tiết', icon: Sparkles },
    { id: 'color', name: 'Màu sắc', icon: Palette },
    { id: 'accessories', name: 'Phụ kiện', icon: Heart }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold gradient-text">Thiết kế áo dài</h1>
              <p className="text-gray-600">Tạo áo dài cá nhân hóa với AI</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAISuggestions(!showAISuggestions)}
                className="btn-primary text-sm py-2 px-4"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Gợi ý
              </button>
              
              <button className="btn-secondary text-sm py-2 px-4">
                <Camera className="h-4 w-4 mr-2" />
                Thử áo AR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Tools */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <DesignerPanel 
            selectedTool={selectedTool}
            onToolChange={setSelectedTool}
            tools={tools}
          />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 relative">
          <DesignerCanvas selectedTool={selectedTool} />
          
          {/* Canvas Controls */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors">
              <RotateCcw className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors">
              <Download className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Right Panel - AI Suggestions */}
        {showAISuggestions && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="w-80 bg-white border-l border-gray-200 overflow-y-auto"
          >
            <AISuggestions />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DesignerPage 