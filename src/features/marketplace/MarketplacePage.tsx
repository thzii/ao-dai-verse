import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Heart, 
  ShoppingCart, 
  Star,
  Eye,
  Share2,
  Grid,
  List,
  ChevronDown,
  MapPin,
  Clock,
  Award,
  Tag,
  Users
} from 'lucide-react'
import { AO_DAI_STYLES, AO_DAI_STYLE_LABELS, SORT_OPTIONS, AVAILABILITY_STATUS } from '../../constants'

interface MarketplaceDesign {
  id: string
  title: string
  description: string
  style: keyof typeof AO_DAI_STYLES
  designer: {
    id: string
    name: string
    avatar: string
    rating: number
    reviewCount: number
    verified: boolean
  }
  price: {
    amount: number
    currency: 'VND' | 'USD' | 'EUR'
    originalPrice?: number
    discount?: number
  }
  images: string[]
  rating: number
  reviewCount: number
  sales: number
  availability: keyof typeof AVAILABILITY_STATUS
  featured: boolean
  trending: boolean
  tags: string[]
  createdAt: Date
}

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [sortBy, setSortBy] = useState<keyof typeof SORT_OPTIONS>('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Mock data
  const designs: MarketplaceDesign[] = [
    {
      id: '1',
      title: 'Áo Dài Ngũ Thân Hoa Sen',
      description: 'Thiết kế áo dài ngũ thân truyền thống với họa tiết hoa sen tinh tế, phù hợp cho các dịp lễ quan trọng.',
      style: 'ngu-than',
      designer: {
        id: '1',
        name: 'Nguyễn Thị Mai',
        avatar: '/images/designers/designer1.jpg',
        rating: 4.8,
        reviewCount: 156,
        verified: true
      },
      price: {
        amount: 2500000,
        currency: 'VND',
        originalPrice: 3000000,
        discount: 17
      },
      images: ['image/aodai-2.jpg'],
      rating: 4.9,
      reviewCount: 89,
      sales: 45,
      availability: 'available',
      featured: true,
      trending: true,
      tags: ['hoa sen', 'truyền thống', 'lễ hội'],
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2',
      title: 'Áo Dài Cung Đình Huế',
      description: 'Áo dài cung đình Huế với họa tiết rồng phượng, mang đậm văn hóa triều Nguyễn.',
      style: 'cung-dinh',
      designer: {
        id: '2',
        name: 'Trần Văn Hùng',
        avatar: '/images/designers/designer2.jpg',
        rating: 4.7,
        reviewCount: 203,
        verified: true
      },
      price: {
        amount: 3500000,
        currency: 'VND'
      },
      images: ['image/aodai.jpg'],
      rating: 4.8,
      reviewCount: 67,
      sales: 23,
      availability: 'limited',
      featured: false,
      trending: true,
      tags: ['cung đình', 'rồng phượng', 'Huế'],
      createdAt: new Date('2024-01-08')
    },
    {
      id: '3',
      title: 'Áo Dài Học Sinh Thanh Lịch',
      description: 'Áo dài học sinh với thiết kế tinh khôi, thanh lịch, phù hợp với môi trường học đường.',
      style: 'hoc-sinh',
      designer: {
        id: '3',
        name: 'Lê Thị Hoa',
        avatar: '/images/designers/designer3.jpg',
        rating: 4.6,
        reviewCount: 98,
        verified: true
      },
      price: {
        amount: 1200000,
        currency: 'VND',
        originalPrice: 1500000,
        discount: 20
      },
      images: ['image/aodai-1.jpg'],
      rating: 4.7,
      reviewCount: 45,
      sales: 78,
      availability: 'available',
      featured: false,
      trending: false,
      tags: ['học sinh', 'thanh lịch', 'tinh khôi'],
      createdAt: new Date('2024-01-12')
    },
    {
      id: '4',
      title: 'Áo Dài Cưới Lộng Lẫy',
      description: 'Áo dài cưới với thiết kế lộng lẫy, phù hợp cho ngày cưới truyền thống.',
      style: 'cuoi',
      designer: {
        id: '4',
        name: 'Phạm Văn Nam',
        avatar: '/image/aodai-3.jpg',
        rating: 4.9,
        reviewCount: 134,
        verified: true
      },
      price: {
        amount: 5000000,
        currency: 'VND'
      },
      images: ['/image/aodai-3.jpg'],
      rating: 4.9,
      reviewCount: 56,
      sales: 12,
      availability: 'available',
      featured: true,
      trending: false,
      tags: ['cưới', 'lộng lẫy', 'truyền thống'],
      createdAt: new Date('2024-01-05')
    }
  ]

  const styles = [
    { id: 'all', name: 'Tất cả kiểu dáng' },
    ...Object.entries(AO_DAI_STYLE_LABELS).map(([key, value]) => ({
      id: key,
      name: value
    }))
  ]

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency as any
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN')
  }

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStyle = selectedStyle === 'all' || design.style === selectedStyle
    const matchesPrice = design.price.amount >= priceRange[0] && design.price.amount <= priceRange[1]
    
    return matchesSearch && matchesStyle && matchesPrice
  })

  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price.amount - b.price.amount
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'popular':
        return b.sales - a.sales
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chợ Thiết Kế Áo Dài</h1>
              <p className="text-gray-600 mt-1">Khám phá và mua sắm các thiết kế áo dài độc đáo từ các nghệ nhân tài năng</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-pink-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Giỏ hàng (3)
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thiết kế áo dài..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Style Filter */}
            <div>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {styles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="relevance">Liên quan nhất</option>
                <option value="price">Giá thấp đến cao</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="newest">Mới nhất</option>
                <option value="popular">Phổ biến nhất</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Filter className="w-4 h-4" />
                Bộ lọc nâng cao
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Xem:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khoảng giá (VND)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Từ"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Đến"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold">{sortedDesigns.length}</span> thiết kế
          </p>
        </div>

        {/* Designs Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
          {sortedDesigns.map((design) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Design Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-64' : ''}`}>
  <img
    src={design.images[0]}
    alt={design.title}
    className={`w-full object-cover ${viewMode === 'list' ? 'h-48' : 'h-64'}`}
  />

  {/* Watermark overlay */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span className="text-white text-3xl font-bold opacity-20 select-none">
      aodaiverse
    </span>
  </div>

  {design.featured && (
    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
      Nổi bật
    </div>
  )}
  {design.trending && (
    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      Hot
    </div>
  )}
  {design.price.discount && (
    <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      -{design.price.discount}%
    </div>
  )}
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
  >
    <Heart className="w-4 h-4 text-gray-600" />
  </motion.button>
</div>


              {/* Design Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{design.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{design.description}</p>

                {/* Designer Info */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={design.designer.avatar}
                    alt={design.designer.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">{design.designer.name}</span>
                  {design.designer.verified && (
                    <Award className="w-4 h-4 text-blue-500" />
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(design.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({design.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(design.price.amount, design.price.currency)}
                    </span>
                    {design.price.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatPrice(design.price.originalPrice, design.price.currency)}
                      </span>
                    )}
                  </div>
                 
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {design.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                  >
                    Mua ngay
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage 