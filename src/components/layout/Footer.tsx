import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Sản phẩm',
      links: [
        { name: 'Thiết kế áo dài', path: '/designer' },
        { name: 'AR Thử áo', path: '/ar-try-on' },
        { name: 'Bộ sưu tập', path: '/gallery' },
        { name: 'Sketch Week', path: '/sketch-week' },
      ]
    },
    {
      title: 'Hỗ trợ',
      links: [
        { name: 'Hướng dẫn sử dụng', path: '/help' },
        { name: 'Chính sách bảo mật', path: '/privacy' },
        { name: 'Điều khoản sử dụng', path: '/terms' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    {
      title: 'Công ty',
      links: [
        { name: 'Về chúng tôi', path: '/about' },
        { name: 'Liên hệ', path: '/contact' },
        { name: 'Tuyển dụng', path: '/careers' },
        { name: 'Tin tức', path: '/news' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-secondary-400" />
              <div>
                <h3 className="text-xl font-serif font-bold gradient-text">
                  Áo DàiVerse
                </h3>
                <p className="text-sm text-gray-300">
                  Tái định nghĩa áo dài
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nền tảng số kết nối người dùng với stylist và nghệ nhân truyền thống, 
              cho phép thiết kế áo dài cá nhân hóa với công nghệ AI và AR tiên tiến.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-secondary-400" />
                <span>contact@aodaiverse.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-secondary-400" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-secondary-400" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-secondary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>&copy; {currentYear} Áo DàiVerse. Được tạo với</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>tại Việt Nam</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-secondary-400 hover:bg-gray-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 