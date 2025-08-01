import { motion } from 'framer-motion'
import { 
  Palette, 
  Camera, 
  Users, 
  Shield, 
  Sparkles,
  Brain,
  Globe
} from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: Palette,
      title: 'Thiết kế cá nhân hóa',
      description: 'Tạo áo dài độc đáo với AI gợi ý theo phong cách và dịp lễ của bạn',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Camera,
      title: 'AR Thử áo',
      description: 'Thử áo dài ảo trên cơ thể thật qua camera với công nghệ AR tiên tiến',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Users,
      title: 'Kết nối nghệ nhân',
      description: 'Liên kết trực tiếp với các nghệ nhân và xưởng may truyền thống',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: Shield,
      title: 'Bảo vệ bản quyền',
      description: 'NFT chứng thực quyền sở hữu thiết kế, tránh việc ăn cắp mẫu',
      color: 'from-traditional-500 to-traditional-600'
    },
    {
      icon: Brain,
      title: 'AI Gợi ý thông minh',
      description: 'Hệ thống AI phân tích phong cách và đưa ra gợi ý thiết kế phù hợp',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Globe,
      title: 'Văn hóa truyền thống',
      description: 'Khám phá ý nghĩa hoa văn và nguồn gốc các kiểu áo dài truyền thống',
      color: 'from-green-500 to-green-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-secondary-500" />
            <span className="text-sm font-medium text-gray-700">
              Tính năng nổi bật
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Công nghệ tiên tiến</span>
            <br />
            <span className="text-gray-800">cho trải nghiệm hoàn hảo</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Áo DàiVerse kết hợp công nghệ AI, AR và blockchain để mang đến 
            trải nghiệm thiết kế áo dài hiện đại nhất, đồng thời bảo tồn và 
            phát huy giá trị văn hóa truyền thống.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="card p-8 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">99%</div>
              <div className="text-gray-600">Độ chính xác AI</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-600">Hỗ trợ khách hàng</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">100%</div>
              <div className="text-gray-600">Bảo mật dữ liệu</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5+</div>
              <div className="text-gray-600">Năm kinh nghiệm</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection 