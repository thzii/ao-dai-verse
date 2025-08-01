import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, User, ShoppingBag, Camera } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    // { name: 'Thiết kế', path: '/designer' },
   
    // { name: 'Bộ sưu tập', path: '/gallery' },
    { name: 'Cộng đồng', path: '/community' },
    { name: 'Chợ thiết kế', path: '/marketplace' },
    { name: 'Giáo dục', path: '/education' },
    { name: 'Sketch Week', path: '/sketch-week' },
    
    { name: 'Về chúng tôi', path: '/about' },
    
  ]
  // { name: 'Bảo vệ bản quyền', path: '/copyright' },
  // { name: 'AR Thử áo', path: '/ar-try-on' },



  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
  <div className="flex justify-between items-center h-20 space-x-6">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-secondary-500" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="h-8 w-8 border-2 border-primary-500 rounded-full opacity-30" />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold gradient-text">
                AoDaiVerse
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Tái định nghĩa áo dài
              </span>
            </div>
          </Link>

         {/* Desktop Navigation */}
<nav className="hidden md:flex items-center space-x-6">
  {navItems.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      className={`group relative px-3 py-2 text-sm font-medium transition duration-200 ${
        location.pathname === item.path
          ? 'text-secondary-600'
          : 'text-gray-700 hover:text-secondary-600'
      }`}
    >
      {item.name}

      {/* Active underline */}
      {location.pathname === item.path && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
        />
      )}

      {/* Hover underline */}
      {location.pathname !== item.path && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 transition-all duration-300 group-hover:w-full" />
      )}
    </Link>
  ))}
</nav>


          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
          <Link
  to="/profileuser"
  className="p-2 text-gray-600 hover:text-secondary-500 transition-colors"
>
  <User className="h-5 w-5" />
</Link>
            <button className="p-2 text-gray-600 hover:text-secondary-500 transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            {/* <button className="btn-primary text-sm py-2 px-4">
              <Camera className="h-4 w-4 mr-2" />
              Thử áo AR
            </button> */}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-secondary-500 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-secondary-50 text-secondary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
              <Link to="/ar-try-on/start" className="w-full btn-primary inline-flex items-center justify-center">
    <Camera className="h-4 w-4 mr-2" />
    Thử áo AR
  </Link>
                <button className="w-full btn-secondary">
                  <User className="h-4 w-4 mr-2" />
                  Đăng nhập
                </button>
              </div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header 