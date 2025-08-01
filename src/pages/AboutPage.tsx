import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Heart, 
  Users, 
  Award,
  Globe,
  Shield,
  Brain,
  Camera
} from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { icon: Users, number: '50K+', label: 'Người dùng' },
    { icon: Award, number: '500+', label: 'Nghệ nhân' },
    { icon: Heart, number: '10K+', label: 'Thiết kế đã tạo' },
    { icon: Globe, number: '15+', label: 'Quốc gia' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Tôn trọng văn hóa',
      description: 'Bảo tồn và phát huy giá trị văn hóa truyền thống Việt Nam'
    },
    {
      icon: Brain,
      title: 'Sáng tạo không giới hạn',
      description: 'Kết hợp công nghệ hiện đại với nghệ thuật truyền thống'
    },
    {
      icon: Shield,
      title: 'Bảo vệ bản quyền',
      description: 'Đảm bảo quyền lợi của nghệ nhân và nhà thiết kế'
    },
    {
      icon: Users,
      title: 'Cộng đồng kết nối',
      description: 'Tạo cầu nối giữa nghệ nhân và người yêu áo dài'
    }
  ]

  const team = [
    {
      name: 'Đặng Thị Thúy Vi',
      role: 'CEO & Founder',
      avatar: '👩‍💼',
      description: 'Chuyên gia văn hóa truyền thống với 15 năm kinh nghiệm'
    },
    {
      name: 'Trần Nguyễn Phú Nghĩa',
      role: 'CTO',
      avatar: '👨‍💻',
      description: 'Chuyên gia AI/ML với kinh nghiệm tại Google, Facebook'
    },
    {
      name: 'Nguyễn Ngọc Trúc Quỳnh',
      role: 'Head of Design',
      avatar: '👩‍🎨',
      description: 'Nhà thiết kế thời trang với bằng từ Parsons School'
    },
    {
      name: 'Huỳnh Minh Tiến',
      role: 'Head of Partnerships',
      avatar: '👨‍💼',
      description: 'Chuyên gia phát triển kinh doanh và đối tác'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
          

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Tái định nghĩa
              <br />
              <span className="text-yellow-300">áo dài Việt Nam</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              AoDaiVerse là nền tảng số tiên phong kết hợp công nghệ AI, AR và blockchain 
              để bảo tồn và phát huy giá trị văn hóa áo dài Việt Nam trong thời đại số.
            </motion.p>
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="mt-8 flex justify-center"
>
  <a
    href="/contact"
    className="inline-flex items-center px-6 py-3 rounded-full text-white bg-white/20 hover:bg-white/30 backdrop-blur-lg font-semibold transition duration-300"
  >
    <Sparkles className="h-5 w-5 mr-2" />
    Liên hệ
  </a>
</motion.div>

            {/* { name: 'Liên hệ', path: '/contact' }, */}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Sứ mệnh</span> của chúng tôi
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                AoDaiVerse được thành lập với sứ mệnh tái định nghĩa áo dài Việt Nam 
                trong thời đại số, kết hợp công nghệ tiên tiến với giá trị văn hóa truyền thống.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chúng tôi tin rằng áo dài không chỉ là trang phục truyền thống mà còn là 
                biểu tượng văn hóa, nghệ thuật và bản sắc dân tộc cần được bảo tồn và phát huy.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Bảo tồn văn hóa truyền thống</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  <span className="text-gray-700">Kết nối nghệ nhân và người dùng</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <span className="text-gray-700">Phát triển công nghệ sáng tạo</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌸</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Áo dài - Biểu tượng văn hóa
                  </h3>
                  <p className="text-gray-600">
                    Từ trang phục cung đình đến quốc phục, áo dài đã trải qua hàng trăm năm 
                    phát triển và trở thành biểu tượng văn hóa không thể thiếu của Việt Nam.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Giá trị cốt lõi</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Đội ngũ</span> sáng lập
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Những con người đam mê văn hóa và công nghệ đứng sau AoDaiVerse
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="card p-6">
                  <div className="text-4xl mb-4">{member.avatar}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Tham gia cùng chúng tôi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Hãy cùng chúng tôi bảo tồn và phát huy giá trị văn hóa áo dài Việt Nam
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              <Camera className="h-5 w-5 mr-2" />
              Thử áo AR ngay
            </button>
            <button className="btn-primary bg-white text-white-600 hover:bg-gray-100">
              <Sparkles className="h-5 w-5 mr-2" />
              Bắt đầu thiết kế
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage 