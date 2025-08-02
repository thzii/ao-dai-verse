import React from 'react'

const connectedStylists = [
  { id: 1, name: 'Nguyễn Trâm', avatar: '/image/per1.jpg' },
  { id: 2, name: 'Lê Linh', avatar: '/image/per2.jpg' }
]

const savedDesigns = [
  { id: 101, title: 'Sen Hồng', image: '/image/aodai3.jpg' },
  { id: 102, title: 'Trúc Viên', image: '/image/aodai2.jpg' }
]

const purchasedDesigns = [
  { id: 201, title: 'Nhật Bình', image: '/image/aodaimua.jpg', qr: '/qr/qr1.svg' },
  { id: 202, title: 'Mẫu Đơn', image: '/image/aodaimua1.jpg', qr: 'qr/qr2.svg' }
]

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold text-[#2e1065] border-l-4 border-[#c084fc] pl-3">
      {title}
    </h2>
    {children}
  </section>
)

const ProfilePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 bg-gradient-to-b from-[#fff1f2] via-[#fdf4ff] to-[#f0f9ff] text-[#1e1e1e] font-sans">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#4c1d95]">Hồ sơ của bạn</h1>
        <p className="text-[#6b7280] text-sm">Khám phá các kết nối và thiết kế cá nhân</p>
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
                className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-[#a855f7]"
              />
              <span className="text-sm font-medium text-[#4c1d95]">{stylist.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Thiết kế đã lưu">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {savedDesigns.map((design) => (
            <div
              key={design.id}
              className="relative rounded-xl overflow-hidden bg-white border border-purple-200 shadow-sm hover:shadow-md transition"
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
  <span className="text-white font-bold text-5  xl px-3 py-1 rounded rotate-12 opacity-50 tracking-wider">
    aodaiverse
  </span>
</div>

              <div className="p-3 text-sm font-semibold text-[#4c1d95]">{design.title}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Thiết kế đã mua">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {purchasedDesigns.map((design) => (
            <div
              key={design.id}
              className="relative rounded-xl overflow-hidden bg-white border border-purple-200 shadow-sm hover:shadow-md transition"
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-white p-1 rounded border border-neutral-300 shadow">
                <img src={design.qr} alt="QR" className="w-full h-full object-contain" />
              </div>
              <div className="p-3 text-sm font-semibold text-[#4c1d95]">{design.title}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default ProfilePage
