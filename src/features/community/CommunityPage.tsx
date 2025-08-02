import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Bookmark,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Award,
  Calendar,
  MapPin
} from 'lucide-react'
import { COMMUNITY_CATEGORIES, POST_TYPES } from '../../constants'

interface CommunityPost {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    role: 'user' | 'designer' | 'admin'
  }
  type: keyof typeof POST_TYPES
  content: {
    text?: string
    images?: string[]
    video?: string
    designId?: string
  }
  likes: number
  comments: number
  shares: number
  views: number
  tags: string[]
  isPinned: boolean
  createdAt: Date
}

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest')

  // Mock data
  const communities = [
    {
      id: '1',
      name: 'Áo Dài Truyền Thống',
      description: 'Chia sẻ về áo dài truyền thống và văn hóa Việt Nam',
      category: 'general',
      members: 1250,
      posts: 89,
      image: '/images/community/traditional.jpg'
    },
    {
      id: '2',
      name: 'Designers & Nghệ Nhân',
      description: 'Cộng đồng dành cho các nhà thiết kế và nghệ nhân',
      category: 'designers',
      members: 450,
      posts: 156,
      image: '/images/community/designers.jpg'
    },
    {
      id: '3',
      name: 'Người Mới Bắt Đầu',
      description: 'Học hỏi và chia sẻ kinh nghiệm về áo dài',
      category: 'beginners',
      members: 890,
      posts: 234,
      image: '/images/community/beginners.jpg'
    }
  ]

  const posts: CommunityPost[] = [
    {
      id: '1',
      author: {
        id: '1',
        name: 'Nguyễn Thị Mai',
        avatar: '/image/per1.jpg',
        role: 'designer'
      },
      type: 'image',
      content: {
        text: 'Mẫu áo dài mới nhất của tôi lấy cảm hứng từ hoa sen truyền thống. Các bạn thấy thế nào?',
        images: ['/image/aodai1.jpg', '/image/aodai2.jpg']
      },
      likes: 45,
      comments: 12,
      shares: 8,
      views: 234,
      tags: ['áo dài', 'hoa sen', 'truyền thống'],
      isPinned: false,
      createdAt: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      author: {
        id: '2',
        name: 'Trần Văn Hùng',
        avatar: '/image/per2.jpg',
        role: 'user'
      },

      type: 'text',
      content: {
        text: 'Ai có thể tư vấn cho tôi về cách chọn chất liệu vải phù hợp cho áo dài cưới không? Tôi đang chuẩn bị cho ngày cưới sắp tới.'
      },
      likes: 23,
      comments: 18,
      shares: 5,
      views: 156,
      tags: ['áo dài cưới', 'chất liệu', 'tư vấn'],
      isPinned: true,
      createdAt: new Date('2024-01-14T15:45:00')
    },
    {
      id: '3',
      author: {
        id: '3',
        name: 'Lê Thị Hoa',
        avatar: '/image/per3.jpg',
        role: 'designer'
      },
      type: 'video',
      content: {
        text: 'Video hướng dẫn cách may áo dài ngũ thân truyền thống. Hy vọng sẽ giúp ích cho các bạn!',
        // video: 'https://www.youtube.com/embed/Kstrszax2ss'
      },
      likes: 67,
      comments: 25,
      shares: 15,
      views: 456,
      tags: ['hướng dẫn', 'may áo dài', 'ngũ thân'],
      isPinned: false,
      createdAt: new Date('2024-01-13T09:20:00')
    }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Users },
    { id: 'general', name: 'Chung', icon: MessageCircle },
    { id: 'designers', name: 'Designers', icon: Award },
    { id: 'beginners', name: 'Người mới', icon: TrendingUp }
  ]

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'Vừa xong'
    if (hours < 24) return `${hours} giờ trước`
    if (days < 7) return `${days} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cộng Đồng Áo Dài</h1>
              <p className="text-gray-600 mt-1">Kết nối, chia sẻ và học hỏi về văn hóa áo dài</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tạo bài viết
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Danh mục</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <motion.button
                      key={category.id}
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-pink-100 text-pink-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Communities */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Cộng đồng nổi bật</h3>
              <div className="space-y-4">
                {communities.map((community) => (
                  <motion.div
                    key={community.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-pink-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{community.name}</h4>
                        <p className="text-sm text-gray-600">{community.members} thành viên</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="latest">Mới nhất</option>
                    <option value="popular">Phổ biến</option>
                    <option value="trending">Đang hot</option>
                  </select>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <Filter className="w-4 h-4" />
                    Bộ lọc
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {posts.length} bài viết
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                            {post.author.role === 'designer' && (
                              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                Designer
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                      </div>
                      {post.isPinned && (
                        <div className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Bookmark className="w-3 h-3" />
                          Ghim
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    {post.content.text && (
                      <p className="text-gray-800 mb-4">{post.content.text}</p>
                    )}
                    
                    {post.content.images && post.content.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {post.content.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    {post.content.video && (
                      <div className="mb-4">
                        <video
                          src={post.content.video}
                          controls
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{post.likes}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">{post.shares}</span>
                        </motion.button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{post.views} lượt xem</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage 