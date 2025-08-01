import React from 'react'

const connectedStylists = [
  { id: 1, name: 'Nguyễn Trâm', avatar: '/stylists/tram.png' },
  { id: 2, name: 'Lê Linh', avatar: '/stylists/linh.png' }
]

const savedDesigns = [
  { id: 101, title: 'Sen Hồng', image: '/designs/sen.png' },
  { id: 102, title: 'Trống Đồng', image: '/designs/trongdong.png' }
]

const purchasedDesigns = [
  { id: 201, title: 'Nhật Bình', image: '/designs/nhatbinh.png', qr: '/qr/nhatbinh.svg' },
  { id: 202, title: 'Mẫu Đơn', image: '/designs/maudon.png', qr: '/qr/maudon.svg' }
]

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold text-[#1a1a1a] border-l-4 border-[#5c6ac4] pl-3">
      {title}
    </h2>
    {children}
  </section>
)

const ProfilePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 bg-gradient-to-b from-[#fafafa] to-[#f1f1f1] text-[#1e1e1e] font-sans">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Hồ sơ của bạn</h1>
        <p className="text-[#666] text-sm">Khám phá các kết nối và thiết kế cá nhân</p>
      </div>

      <Section title="Stylist đã kết nối">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {connectedStylists.map((stylist) => (
            <div
              key={stylist.id}
              className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
            >
              <img
                src={stylist.avatar}
                alt={stylist.name}
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <span className="text-sm font-medium">{stylist.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Thiết kế đã lưu">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {savedDesigns.map((design) => (
            <div
              key={design.id}
              className="relative rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md transition"
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded-full">
                aodaiverse
              </div>
              <div className="p-3 text-sm font-semibold text-[#333]">{design.title}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Thiết kế đã mua">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {purchasedDesigns.map((design) => (
            <div
              key={design.id}
              className="relative rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md transition"
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-white p-1 rounded border border-neutral-300 shadow">
                <img src={design.qr} alt="QR" className="w-full h-full object-contain" />
              </div>
              <div className="p-3 text-sm font-semibold text-[#333]">{design.title}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default ProfilePage
