import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Star, 
  TrendingUp,
  Palette,
  Camera
} from 'lucide-react'

const AISuggestions = () => {
  const suggestions = [
    {
      id: 1,
      type: 'style',
      title: 'Áo dài cung đình Huế',
      description: 'Phù hợp với sự kiện trang trọng, mang đậm văn hóa truyền thống',
      confidence: 95,
      tags: ['Trang trọng', 'Truyền thống', 'Cung đình'],
      image: '👑'
    },
    {
      id: 2,
      type: 'color',
      title: 'Màu đỏ truyền thống',
      description: 'Màu đỏ tượng trưng cho may mắn và thịnh vượng trong văn hóa Việt',
      confidence: 88,
      tags: ['May mắn', 'Truyền thống', 'Thịnh vượng'],
      image: '🔴'
    },
    {
      id: 3,
      type: 'pattern',
      title: 'Họa tiết hoa mai',
      description: 'Hoa mai biểu tượng của mùa xuân và sự khởi đầu mới',
      confidence: 92,
      tags: ['Mùa xuân', 'Khởi đầu', 'Truyền thống'],
      image: '🌸'
    },
    {
      id: 4,
      type: 'fabric',
      title: 'Lụa tơ tằm cao cấp',
      description: 'Chất liệu mềm mại, thoáng mát, phù hợp với khí hậu Việt Nam',
      confidence: 85,
      tags: ['Cao cấp', 'Mềm mại', 'Thoáng mát'],
      image: '🕸️'
    }
  ]

  const trendingStyles = [
    { name: 'Áo dài cách tân', trend: '+15%', icon: TrendingUp },
    { name: 'Họa tiết geometric', trend: '+23%', icon: TrendingUp },
    { name: 'Màu pastel', trend: '+8%', icon: TrendingUp },
    { name: 'Chất liệu eco-friendly', trend: '+31%', icon: TrendingUp }
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="h-6 w-6 text-secondary-500" />
          <h3 className="text-lg font-semibold text-gray-800">AI Gợi ý</h3>
        </div>
        <p className="text-sm text-gray-600">
          Dựa trên phong cách và sở thích của bạn
        </p>
      </div>

      {/* AI Suggestions */}
      <div className="space-y-4 mb-8">
        <h4 className="font-medium text-gray-800 mb-3">Gợi ý cá nhân hóa</h4>
        
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-100"
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{suggestion.image}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-800">{suggestion.title}</h5>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">
                      {suggestion.confidence}%
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {suggestion.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestion.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-white/60 text-primary-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-primary-500 text-white text-xs rounded-lg hover:bg-primary-600 transition-colors">
                    Áp dụng
                  </button>
                  <button className="px-3 py-1 bg-white/60 text-gray-600 text-xs rounded-lg hover:bg-white/80 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trending Styles */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-3">Xu hướng hiện tại</h4>
        <div className="space-y-3">
          {trendingStyles.map((style, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <style.icon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">{style.name}</span>
              </div>
              <span className="text-sm font-medium text-green-600">{style.trend}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-800 mb-3">Thao tác nhanh</h4>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Palette className="h-4 w-4" />
          <span>Tạo thiết kế mới</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
        >
          <Camera className="h-4 w-4" />
          <span>Thử áo AR</span>
        </motion.button>
      </div>

      {/* AI Status */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-blue-700">AI đang học từ sở thích của bạn</span>
        </div>
      </div>
    </div>
  )
}

export default AISuggestions 