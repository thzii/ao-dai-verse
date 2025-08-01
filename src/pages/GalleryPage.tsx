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
  Sparkles
} from 'lucide-react'

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'traditional', name: 'Truyền thống' },
    { id: 'modern', name: 'Hiện đại' },
    { id: 'wedding', name: 'Cưới hỏi' },
    { id: 'student', name: 'Học sinh' },
    { id: 'royal', name: 'Cung đình' }
  ]

  const designs = [
    {
      id: 1,
      title: 'Áo dài cung đình Huế',
      designer: 'Nghệ nhân Mai',
      category: 'royal',
      image: '👑',
      color: '#dc2626',
      pattern: 'Phượng hoàng',
      rating: 4.9,
      likes: 1234,
      views: 5678,
      price: '2,500,000 VNĐ'
    },
    {
      id: 2,
      title: 'Áo dài cách tân geometric',
      designer: 'Stylist Minh',
      category: 'modern',
      image: '⭐',
      color: '#7c3aed',
      pattern: 'Geometric',
      rating: 4.8,
      likes: 987,
      views: 3456,
      price: '1,800,000 VNĐ'
    },
    {
      id: 3,
      title: 'Áo dài học sinh tinh khôi',
      designer: 'Nhà may Hương',
      category: 'student',
      image: '🎓',
      color: '#ffffff',
      pattern: 'Trắng tinh khôi',
      rating: 4.7,
      likes: 756,
      views: 2345,
      price: '800,000 VNĐ'
    },
    {
      id: 4,
      title: 'Áo dài cưới hoa sen',
      designer: 'Nghệ nhân Lan',
      category: 'wedding',
      image: '💕',
      color: '#ec4899',
      pattern: 'Hoa sen',
      rating: 4.9,
      likes: 1567,
      views: 6789,
      price: '3,200,000 VNĐ'
    },
    {
      id: 5,
      title: 'Áo dài ngũ thân truyền thống',
      designer: 'Nghệ nhân Đức',
      category: 'traditional',
      image: '🏮',
      color: '#dc2626',
      pattern: 'Hoa mai',
      rating: 4.8,
      likes: 890,
      views: 3456,
      price: '2,100,000 VNĐ'
    },
    {
      id: 6,
      title: 'Áo dài pastel hiện đại',
      designer: 'Stylist Anh',
      category: 'modern',
      image: '🌸',
      color: '#fbbf24',
      pattern: 'Pastel',
      rating: 4.6,
      likes: 654,
      views: 2345,
      price: '1,500,000 VNĐ'
    }
  ]

  const filteredDesigns = designs.filter(design => {
    const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.designer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Bộ sưu tập áo dài</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những thiết kế áo dài độc đáo từ các nghệ nhân và stylist hàng đầu Việt Nam
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm thiết kế..."
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

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card overflow-hidden">
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <div className="text-6xl">{design.image}</div>
                  
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
                      {categories.find(c => c.id === design.category)?.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm rounded-full font-medium">
                      {design.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {design.title}
                      </h3>
                      <p className="text-sm text-gray-600">Bởi {design.designer}</p>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: design.color }}
                    />
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{design.pattern}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{design.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-400" />
                        <span>{design.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-blue-400" />
                        <span>{design.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 btn-primary text-sm py-2">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Thử áo AR
                    </button>
                    <button className="flex-1 btn-secondary text-sm py-2">
                      Tùy chỉnh
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredDesigns.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-primary">
              Xem thêm thiết kế
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredDesigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy thiết kế
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

export default GalleryPage 