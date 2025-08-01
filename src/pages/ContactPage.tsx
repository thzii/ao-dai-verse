import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe ý kiến, góp ý và hỗ trợ bạn trong hành trình khám phá áo dài
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Chủ đề tin nhắn"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập nội dung tin nhắn..."
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Gửi tin nhắn
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">info@aodaiverse.com</p>
                    <p className="text-gray-600">support@aodaiverse.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Điện thoại</h3>
                    <p className="text-gray-600">+84 28 1234 5678</p>
                    <p className="text-gray-600">+84 90 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Địa chỉ</h3>
                    <p className="text-gray-600">123 Đường ABC, Quận 1</p>
                    <p className="text-gray-600">Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Giờ làm việc</h3>
                    <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                    <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                    <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mạng xã hội</h2>
              <div className="grid grid-cols-3 gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Facebook className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Facebook</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex flex-col items-center p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Instagram className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Instagram</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Twitter className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Twitter</span>
                </motion.a>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">Làm thế nào để thiết kế áo dài?</span>
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </motion.a>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">Thời gian giao hàng bao lâu?</span>
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </motion.a>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">Chính sách đổi trả như thế nào?</span>
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </motion.a>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">Có thể thử áo AR không?</span>
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage 