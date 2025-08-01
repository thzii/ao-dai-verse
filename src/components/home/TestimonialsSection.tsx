import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Nguyễn Thị Mai',
      role: 'Doanh nhân',
      avatar: '👩‍💼',
      rating: 5,
      content: 'Áo DàiVerse đã giúp tôi tạo ra chiếc áo dài hoàn hảo cho sự kiện quan trọng. Công nghệ AR thử áo thật sự tuyệt vời!',
      design: 'Áo dài cung đình Huế'
    },
    {
      name: 'Trần Văn Minh',
      role: 'Nghệ sĩ',
      avatar: '👨‍🎨',
      rating: 5,
      content: 'Là một nghệ sĩ, tôi rất ấn tượng với khả năng tùy chỉnh và bảo vệ bản quyền thiết kế bằng NFT.',
      design: 'Áo dài cách tân'
    },
    {
      name: 'Lê Thị Hương',
      role: 'Sinh viên',
      avatar: '👩‍🎓',
      rating: 5,
      content: 'Áo dài học sinh được thiết kế rất đẹp và phù hợp với lứa tuổi. Tôi rất hài lòng với kết quả!',
      design: 'Áo dài học sinh'
    },
    {
      name: 'Phạm Văn Dũng',
      role: 'Kiến trúc sư',
      avatar: '👨‍💻',
      rating: 5,
      content: 'Công nghệ AI gợi ý thiết kế rất thông minh. Nó hiểu được phong cách và sở thích của tôi.',
      design: 'Áo dài ngũ thân'
    },
    {
      name: 'Hoàng Thị Lan',
      role: 'Giáo viên',
      avatar: '👩‍🏫',
      rating: 5,
      content: 'Tôi đã sử dụng Áo DàiVerse để thiết kế áo dài cưới cho con gái. Kết quả thật sự tuyệt vời!',
      design: 'Áo dài cưới'
    },
    {
      name: 'Vũ Thị Anh',
      role: 'Nhà thiết kế',
      avatar: '👩‍🎨',
      rating: 5,
      content: 'Là một nhà thiết kế, tôi đánh giá cao sự sáng tạo và chất lượng của nền tảng này.',
      design: 'Áo dài miền Nam'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
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
            <span className="gradient-text">Khách hàng</span>
            <br />
            <span className="text-gray-800">nói gì về chúng tôi</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hàng nghìn khách hàng đã tin tưởng và sử dụng Áo DàiVerse để tạo ra 
            những chiếc áo dài độc đáo và ý nghĩa.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card p-6 h-full relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-gray-200 group-hover:text-secondary-300 transition-colors">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  "{testimonial.content}"
                </p>

                {/* Design Type */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-xs font-medium rounded-full">
                    {testimonial.design}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="text-2xl mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">4.9/5</div>
              <div className="text-gray-600">Đánh giá trung bình</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">98%</div>
              <div className="text-gray-600">Khách hàng hài lòng</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">15K+</div>
              <div className="text-gray-600">Đánh giá tích cực</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-gray-600">Khách hàng tin tưởng</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection 