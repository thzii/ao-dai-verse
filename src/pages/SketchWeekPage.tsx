import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  Download, 
  Filter, 
  Search,
  Star,
  Eye,
  Sparkles,
  Calendar,
  Users,
  Award
} from 'lucide-react'

const SketchWeekPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'traditional', name: 'Truyền thống' },
    { id: 'modern', name: 'Hiện đại' },
    { id: 'fusion', name: 'Kết hợp' },
    { id: 'experimental', name: 'Thử nghiệm' }
  ]

  const sketches = [
    {
      id: 1,
      title: 'Áo dài cung đình cách tân',
      designer: 'Stylist Minh',
      category: 'fusion',
      image: '🎨',
      description: 'Kết hợp họa tiết cung đình với đường cắt hiện đại',
      rating: 4.9,
      likes: 1234,
      views: 5678,
      votes: 89,
      status: 'voting'
    },
    {
      id: 2,
      title: 'Áo dài geometric minimal',
      designer: 'Nghệ nhân Mai',
      category: 'modern',
      image: '📐',
      description: 'Thiết kế tối giản với họa tiết hình học',
      rating: 4.8,
      likes: 987,
      views: 3456,
      votes: 76,
      status: 'voting'
    },
    {
      id: 3,
      title: 'Áo dài hoa sen 3D',
      designer: 'Nhà thiết kế Anh',
      category: 'experimental',
      image: '🌺',
      description: 'Họa tiết hoa sen với hiệu ứng 3D độc đáo',
      rating: 4.7,
      likes: 756,
      views: 2345,
      votes: 65,
      status: 'voting'
    },
    {
      id: 4,
      title: 'Áo dài ngũ thân hiện đại',
      designer: 'Nghệ nhân Lan',
      category: 'traditional',
      image: '🏮',
      description: 'Giữ nguyên cấu trúc ngũ thân với chi tiết hiện đại',
      rating: 4.9,
      likes: 1567,
      views: 6789,
      votes: 92,
      status: 'voting'
    },
    {
      id: 5,
      title: 'Áo dài pastel dream',
      designer: 'Stylist Hương',
      category: 'modern',
      image: '🌈',
      description: 'Bảng màu pastel với họa tiết mơ mộng',
      rating: 4.6,
      likes: 654,
      views: 2345,
      votes: 58,
      status: 'voting'
    },
    {
      id: 6,
      title: 'Áo dài phượng hoàng digital',
      designer: 'Nghệ nhân Đức',
      category: 'fusion',
      image: '🦚',
      description: 'Phượng hoàng được vẽ bằng kỹ thuật số',
      rating: 4.8,
      likes: 890,
      views: 3456,
      votes: 71,
      status: 'voting'
    }
  ]

  const filteredSketches = sketches.filter(sketch => {
    const matchesCategory = selectedCategory === 'all' || sketch.category === selectedCategory
    const matchesSearch = sketch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sketch.designer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">Sự kiện đặc biệt</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sketch Week
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Tuần lễ Áo dài Phác Thảo - Nơi những ý tưởng sáng tạo được hiện thực hóa
            </p>
          </div>

          {/* Event Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-white/80" />
              <h3 className="font-semibold mb-1">Thời gian</h3>
              <p className="text-white/80">15-21 Tháng 12, 2024</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-white/80" />
              <h3 className="font-semibold mb-1">Tham gia</h3>
              <p className="text-white/80">500+ Designer</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-white/80" />
              <h3 className="font-semibold mb-1">Giải thưởng</h3>
              <p className="text-white/80">100,000,000 VNĐ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sketch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sketches Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSketches.map((sketch, index) => (
            <motion.div
              key={sketch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card overflow-hidden">
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-b border-gray-200">
                  <div className="text-6xl">{sketch.image}</div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-5 w-5 text-red-500" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Share2 className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Download className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs rounded-full">
                      {categories.find(c => c.id === sketch.category)?.name}
                    </span>
                  </div>

                  {/* Vote Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm rounded-full font-medium">
                      {sketch.votes} votes
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {sketch.title}
                      </h3>
                      <p className="text-sm text-gray-600">Bởi {sketch.designer}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{sketch.description}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{sketch.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-400" />
                        <span>{sketch.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-blue-400" />
                        <span>{sketch.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 btn-primary text-sm py-2">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Bình chọn
                    </button>
                    <button className="flex-1 btn-secondary text-sm py-2">
                      Xem 3D
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredSketches.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-primary">
              Xem thêm sketch
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredSketches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy sketch
            </h3>
            <p className="text-gray-600 mb-4">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Xem tất cả
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SketchWeekPage 