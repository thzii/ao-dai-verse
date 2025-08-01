import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  ArrowRight, 
  Camera,
  Palette,
  Users,
  Star
} from 'lucide-react'

const CTASection = () => {
  const features = [
    {
      icon: Palette,
      title: 'Thiết kế cá nhân hóa',
      description: 'AI gợi ý theo phong cách của bạn'
    },
    {
      icon: Camera,
      title: 'AR Thử áo',
      description: 'Thử áo dài ảo trên cơ thể thật'
    },
    {
      icon: Users,
      title: 'Kết nối nghệ nhân',
      description: 'Liên kết với xưởng may truyền thống'
    },
    {
      icon: Star,
      title: 'Bảo vệ bản quyền',
      description: 'NFT chứng thực quyền sở hữu'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 floral-bg opacity-5"></div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-full blur-xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="h-5 w-5 text-secondary-400" />
            <span className="text-sm font-medium text-white">
              🌸 Bắt đầu hành trình sáng tạo ngay hôm nay
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Sẵn sàng</span>
            <br />
            <span className="text-white">
              tạo áo dài của riêng bạn?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Tham gia cộng đồng AoDaiVerse và khám phá vẻ đẹp của áo dài Việt Nam 
            với công nghệ hiện đại nhất.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/designer"
              className="btn-primary inline-flex items-center justify-center group text-lg py-4 px-8"
            >
              <Palette className="h-6 w-6 mr-3" />
              Bắt đầu thiết kế miễn phí
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/ar-try-on"
              className="btn-secondary inline-flex items-center justify-center group text-lg py-4 px-8"
            >
              <Camera className="h-6 w-6 mr-3" />
              Thử áo AR ngay
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Không cần kinh nghiệm thiết kế!
            </h3>
            <p className="text-gray-300 mb-6">
              AI của chúng tôi sẽ hướng dẫn bạn từng bước để tạo ra chiếc áo dài hoàn hảo.
            </p>
            <Link
              to="/designer"
              className="inline-flex items-center bg-white text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Bắt đầu ngay - Hoàn toàn miễn phí
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection 