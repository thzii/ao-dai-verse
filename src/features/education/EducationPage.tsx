import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Users, 
  Star, 
  Play,
  Filter,
  Search,
  ChevronRight,
  Calendar,
  Award,
  Globe,
  Heart,
  Share2
} from 'lucide-react'
import { Course, EDUCATION_CATEGORIES, EDUCATION_LEVELS } from '../../types'

const EducationPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for courses
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Lịch sử Áo Dài Việt Nam',
        description: 'Khám phá lịch sử phát triển của áo dài từ thời kỳ cổ đại đến hiện đại',
        category: 'history',
        level: 'beginner',
        duration: 120,
        lessons: [],
        instructor: {
          id: '1',
          userId: '1',
          name: 'Nguyễn Thị Minh Hương',
          avatar: '/image/per1.jpg',
          bio: 'Chuyên gia nghiên cứu văn hóa Việt Nam',
          specialties: ['ngu-than', 'cung-dinh'],
          experience: 15,
          certifications: [],
          portfolio: [],
          rating: 4.8,
          reviewCount: 156,
          verificationStatus: 'verified',
          isAvailable: true,
          location: { country: 'Việt Nam', city: 'Hà Nội', address: '' },
          languages: ['vi', 'en'],
          pricing: { consultationFee: 500000, designFee: 2000000, productionFee: 5000000, currency: 'VND', paymentMethods: [] },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        price: 0,
        currency: 'VND',
        enrolledStudents: 1247,
        rating: 4.9,
        reviewCount: 89,
        certificate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Kỹ thuật may áo dài truyền thống',
        description: 'Học các kỹ thuật may áo dài cơ bản và nâng cao',
        category: 'technique',
        level: 'intermediate',
        duration: 180,
        lessons: [],
        instructor: {
          id: '2',
          userId: '2',
          name: 'Trần Văn Thành',
          avatar: '/image/per2.jpg',
          bio: 'Nghệ nhân may áo dài với 30 năm kinh nghiệm',
          specialties: ['ngu-than', 'cuoi'],
          experience: 30,
          certifications: [],
          portfolio: [],
          rating: 4.9,
          reviewCount: 234,
          verificationStatus: 'verified',
          isAvailable: true,
          location: { country: 'Việt Nam', city: 'Huế', address: '' },
          languages: ['vi'],
          pricing: { consultationFee: 300000, designFee: 1500000, productionFee: 3000000, currency: 'VND', paymentMethods: [] },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        price: 1500000,
        currency: 'VND',
        enrolledStudents: 892,
        rating: 4.8,
        reviewCount: 156,
        certificate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'Thiết kế áo dài hiện đại',
        description: 'Sáng tạo thiết kế áo dài với phong cách hiện đại',
        category: 'design',
        level: 'advanced',
        duration: 240,
        lessons: [],
        instructor: {
          id: '3',
          userId: '3',
          name: 'Lê Thị Anh',
          avatar: '/image/per3.jpg',
          bio: 'Nhà thiết kế thời trang chuyên về áo dài',
          specialties: ['hoc-sinh', 'mien-nam'],
          experience: 12,
          certifications: [],
          portfolio: [],
          rating: 4.7,
          reviewCount: 98,
          verificationStatus: 'verified',
          isAvailable: true,
          location: { country: 'Việt Nam', city: 'TP.HCM', address: '' },
          languages: ['vi', 'en', 'fr'],
          pricing: { consultationFee: 800000, designFee: 3000000, productionFee: 8000000, currency: 'VND', paymentMethods: [] },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        price: 2500000,
        currency: 'VND',
        enrolledStudents: 567,
        rating: 4.7,
        reviewCount: 78,
        certificate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    setCourses(mockCourses)
    setFilteredCourses(mockCourses)
    setIsLoading(false)
  }, [])

  // Filter courses
  useEffect(() => {
    let filtered = courses

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredCourses(filtered)
  }, [courses, selectedCategory, selectedLevel, searchQuery])

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatPrice = (price: number, currency: string): string => {
    if (price === 0) return 'Miễn phí'
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency,
    }).format(price)
  }

  const getCategoryLabel = (category: string): string => {
    const labels = {
      history: 'Lịch sử',
      culture: 'Văn hóa',
      technique: 'Kỹ thuật',
      design: 'Thiết kế'
    }
    return labels[category as keyof typeof labels] || category
  }

  const getLevelLabel = (level: string): string => {
    const labels = {
      beginner: 'Cơ bản',
      intermediate: 'Trung cấp',
      advanced: 'Nâng cao'
    }
    return labels[level as keyof typeof labels] || level
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Học về Áo Dài
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Khám phá vẻ đẹp văn hóa Việt Nam thông qua các khóa học chuyên sâu về áo dài
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5" />
                <span>{courses.length} khóa học</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Users className="w-5 h-5" />
                <span>2,706 học viên</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span>Chứng chỉ được công nhận</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">Tất cả danh mục</option>
                <option value="history">Lịch sử</option>
                <option value="culture">Văn hóa</option>
                <option value="technique">Kỹ thuật</option>
                <option value="design">Thiết kế</option>
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">Tất cả cấp độ</option>
                <option value="beginner">Cơ bản</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-pink-500" />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryLabel(course.category)}
                </div>
                <div className="absolute bottom-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {getLevelLabel(course.level)}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{course.instructor.name}</p>
                    <p className="text-sm text-gray-500">{course.instructor.bio}</p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledStudents} học viên</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-pink-600">
                    {formatPrice(course.price, course.currency)}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Học ngay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default EducationPage 