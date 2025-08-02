import React from 'react'
import { Star, UserPlus } from 'lucide-react'

const AISuggestions = () => {
  const stylist = {
    name: 'Trần Hạ Linh',
    title: 'Phong cách hiện đại, phá cách',
    avatar: 'https://i.pravatar.cc/100?u=stylist-ai',
    description:
      'Chuyên gia thiết kế áo dài hiện đại kết hợp văn hoá truyền thống. Phù hợp với các bạn trẻ yêu thích sự sáng tạo và cá tính.',
    rating: 4.9,
    reviews: 152
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Stylist được đề xuất</h2>
        <p className="text-sm text-gray-500">Được chọn dựa trên thiết kế và sở thích của bạn</p>
      </div>

      <div className="bg-white shadow rounded-xl p-4 flex items-start space-x-4 border border-gray-100">
        <img
          src={stylist.avatar}
          alt={stylist.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
        />
        <div className="flex-1">
          <h3 className="text-md font-semibold text-gray-900">{stylist.name}</h3>
          <p className="text-sm text-indigo-600 mb-1">{stylist.title}</p>
          <p className="text-sm text-gray-600 mb-2">{stylist.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-500 text-sm space-x-1">
              <Star className="h-4 w-4 fill-yellow-400" />
              <span>{stylist.rating}</span>
              <span className="text-gray-500 text-xs">({stylist.reviews} đánh giá)</span>
            </div>
            <button className="btn-primary text-xs flex items-center space-x-1 px-3 py-1">
              <UserPlus className="h-4 w-4" />
              <span>Kết nối</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AISuggestions
