import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Heart, GraduationCap, Users, Star } from 'lucide-react'

const AoDaiTypesSection = () => {
  const aoDaiTypes = [
    {
      name: 'Áo dài ngũ thân',
      description: 'Kiểu áo dài truyền thống 5 thân, thể hiện sự trang trọng và quý phái',
      icon: Crown,
      color: 'from-yellow-400 to-orange-500',
      features: ['Trang trọng', 'Truyền thống', 'Quý phái']
    },
    {
      name: 'Áo dài cung đình Huế',
      description: 'Áo dài cung đình với họa tiết tinh xảo, mang đậm dấu ấn văn hóa Huế',
      icon: Crown,
      color: 'from-purple-400 to-pink-500',
      features: ['Cung đình', 'Tinh xảo', 'Văn hóa Huế']
    },
    {
      name: 'Áo dài cách tân',
      description: 'Áo dài hiện đại với thiết kế sáng tạo, phù hợp xu hướng thời trang',
      icon: Star,
      color: 'from-blue-400 to-cyan-500',
      features: ['Hiện đại', 'Sáng tạo', 'Xu hướng']
    },
    {
      name: 'Áo dài học sinh',
      description: 'Áo dài trắng tinh khôi, biểu tượng của tuổi học trò Việt Nam',
      icon: GraduationCap,
      color: 'from-green-400 to-emerald-500',
      features: ['Tinh khôi', 'Học sinh', 'Truyền thống']
    },
    {
      name: 'Áo dài cưới',
      description: 'Áo dài cưới truyền thống với họa tiết phượng hoàng, rồng phượng',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      features: ['Cưới hỏi', 'Phượng hoàng', 'Linh thiêng']
    },
    {
      name: 'Áo dài miền Nam',
      description: 'Áo dài miền Nam với thiết kế thoải mái, phù hợp khí hậu nóng ẩm',
      icon: Users,
      color: 'from-indigo-400 to-purple-500',
      features: ['Thoải mái', 'Miền Nam', 'Khí hậu']
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Khám phá</span>
            <br />
            <span className="text-gray-800">các loại áo dài truyền thống</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Từ áo dài ngũ thân trang trọng đến áo dài cách tân hiện đại, 
            mỗi kiểu áo dài đều mang trong mình một câu chuyện văn hóa riêng.
          </p>
        </motion.div>

        {/* Ao Dai Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {aoDaiTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card p-6 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
                    {type.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {type.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${type.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/designer"
            className="btn-primary inline-flex items-center group"
          >
            Khám phá thêm
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default AoDaiTypesSection 