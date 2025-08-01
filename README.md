# 🌸 Áo DàiVerse - Tái định nghĩa áo dài như một biểu tượng thời trang cá nhân hóa

## 📖 Giới thiệu

Áo DàiVerse là một nền tảng số kết nối người dùng với stylist và nghệ nhân truyền thống, cho phép thiết kế áo dài cá nhân hóa với công nghệ AI, AR và blockchain.

## ✨ Tính năng chính

- **🎨 Thiết kế cá nhân hóa**: Tạo áo dài độc đáo với AI gợi ý
- **📱 AR Thử áo**: Thử áo dài ảo trên cơ thể thật qua camera
- **👥 Kết nối nghệ nhân**: Liên kết với các nghệ nhân và xưởng may truyền thống
- **🔒 Bảo vệ bản quyền**: NFT chứng thực quyền sở hữu thiết kế
- **🤖 AI Gợi ý thông minh**: Phân tích phong cách và đưa ra gợi ý
- **🌏 Văn hóa truyền thống**: Khám phá ý nghĩa hoa văn và nguồn gốc

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing

### 3D & AR
- **React Three Fiber** - 3D rendering
- **Three.js** - 3D graphics
- **@react-three/drei** - Three.js helpers

### State Management & Utilities
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── designer/          # Components cho trang thiết kế
│   ├── home/             # Components cho trang chủ
│   └── layout/           # Header, Footer
├── pages/                # Các trang chính
├── App.tsx              # Component chính
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎯 Các trang chính

1. **Trang chủ** (`/`) - Giới thiệu và tính năng
2. **Thiết kế** (`/designer`) - Công cụ thiết kế áo dài
3. **AR Thử áo** (`/ar-try-on`) - Thử áo dài ảo
4. **Thư viện** (`/gallery`) - Bộ sưu tập thiết kế
5. **Sketch Week** (`/sketch-week`) - Sự kiện đặc biệt
6. **Giới thiệu** (`/about`) - Thông tin về dự án
7. **Liên hệ** (`/contact`) - Form liên hệ

## 🎨 Design System

### Màu sắc
- **Primary**: Pink gradient (`#d946ef` to `#ef4444`)
- **Secondary**: Purple gradient
- **Accent**: Orange gradient
- **Traditional**: Red gradient

### Typography
- **Inter** - Font chính
- **Playfair Display** - Font tiêu đề
- **Dancing Script** - Font nghệ thuật

### Components
- `.btn-primary` - Nút chính
- `.btn-secondary` - Nút phụ
- `.card` - Card component
- `.gradient-text` - Text gradient
- `.glass-effect` - Hiệu ứng kính

## 🔧 Cấu hình

### Vite Config
- Port: 3000
- Auto-open browser
- Path alias: `@` → `src/`

### Tailwind Config
- Custom colors
- Custom animations
- Custom fonts
- Custom background patterns

### TypeScript Config
- Strict mode enabled
- Path mapping
- Modern ES features

## 🚀 Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Push code lên GitHub
2. Connect repository với Vercel/Netlify
3. Deploy tự động

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📝 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 📞 Liên hệ

- **Email**: info@aodaiverse.com
- **Website**: https://aodaiverse.com
- **GitHub**: https://github.com/aodaiverse

## 🙏 Cảm ơn

Cảm ơn bạn đã quan tâm đến dự án Áo DàiVerse! Chúng tôi mong muốn góp phần bảo tồn và phát huy giá trị văn hóa áo dài Việt Nam. 