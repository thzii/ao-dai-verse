import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import aodai from '../../assets/aodai.png'
import { 
  Sparkles, 
  ArrowRight, 
  Play,
  Camera,
  Palette
} from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0 floral-bg opacity-5"></div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20 blur-xl"
      />
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-secondary-200 to-accent-200 rounded-full opacity-20 blur-xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="h-5 w-5 text-secondary-500" />
              <span className="text-sm font-medium text-gray-700">
                Tái định nghĩa áo dài thời hiện đại
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="gradient-text">AoDaiVerse</span>
              <br />
              <span className="text-gray-800">
                Biểu tượng thời trang
              </span>
              <br />
              <span className="text-gray-600">
                cá nhân hóa
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Nền tảng số kết nối bạn với stylist và nghệ nhân truyền thống. 
              Thiết kế áo dài cá nhân hóa với AI, thử áo AR, và bảo vệ bản quyền bằng NFT.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/designer"
                className="btn-primary inline-flex items-center justify-center group"
              >
                <Palette className="h-5 w-5 mr-2" />
                Bắt đầu thiết kế
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/ar-try-on"
                className="btn-secondary inline-flex items-center justify-center group"
              >
                <Camera className="h-5 w-5 mr-2" />
                Thử áo AR
                <Play className="h-4 w-4 ml-2" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-gray-600">Thiết kế đã tạo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">500+</div>
                <div className="text-sm text-gray-600">Nghệ nhân</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">50K+</div>
                <div className="text-sm text-gray-600">Người dùng</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Model Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-md border border-white/20 overflow-hidden">
              {/* 3D Model Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-80 h-80 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 rounded-full relative"
                >
                  {/* Ao Dai Silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-48 bg-gradient-to-b from-primary-300 to-secondary-300 rounded-t-full relative">
                      {/* Collar */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-primary-400 to-primary-300 rounded-t-full"></div>
                      {/* Sleeves */}
                      <div className="absolute top-8 left-0 w-6 h-20 bg-gradient-to-b from-primary-300 to-secondary-300 rounded-r-full"></div>
                      <div className="absolute top-8 right-0 w-6 h-20 bg-gradient-to-b from-primary-300 to-secondary-300 rounded-l-full"></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Icons */}
              {/* <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-10 right-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md"
              >
                <Sparkles className="h-6 w-6 text-secondary-500" />
              </motion.div> */}

              <div className="absolute inset-0 flex items-center justify-center">
  <motion.img
    src={aodai}
    alt="Áo dài xoay"
    animate={{
      rotateY: [0, 360],
      scale: [1, 1.05, 1],
    }}
    transition={{
      rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    }}
    className="w-80 h-80 object-contain"
  />
</div>




            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 