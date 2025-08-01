import { motion } from 'framer-motion'
import { 
  Heart,
  Crown,
  Star,
  GraduationCap,
  Users,
  Flower,
  Droplets,
  Gem
} from 'lucide-react'

interface DesignerPanelProps {
  selectedTool: string
  onToolChange: (tool: string) => void
  tools: Array<{ id: string; name: string; icon: any }>
}

const DesignerPanel = ({ selectedTool, onToolChange, tools }: DesignerPanelProps) => {
  const aoDaiStyles = [
    { id: 'ngu-than', name: 'Áo dài ngũ thân', icon: Crown, description: 'Truyền thống 5 thân' },
    { id: 'cung-dinh', name: 'Áo dài cung đình', icon: Crown, description: 'Cung đình Huế' },
    { id: 'cach-tan', name: 'Áo dài cách tân', icon: Star, description: 'Hiện đại sáng tạo' },
    { id: 'hoc-sinh', name: 'Áo dài học sinh', icon: GraduationCap, description: 'Tinh khôi học trò' },
    { id: 'cuoi', name: 'Áo dài cưới', icon: Heart, description: 'Cưới hỏi truyền thống' },
    { id: 'mien-nam', name: 'Áo dài miền Nam', icon: Users, description: 'Thoải mái miền Nam' }
  ]

  const fabrics = [
    { id: 'lua', name: 'Lụa tơ tằm', description: 'Cao cấp, mềm mại' },
    { id: 'voan', name: 'Voan', description: 'Nhẹ nhàng, bay bổng' },
    { id: 'gabardine', name: 'Gabardine', description: 'Bền bỉ, dễ giặt' },
    { id: 'cotton', name: 'Cotton', description: 'Thoáng mát, tự nhiên' },
    { id: 'satin', name: 'Satin', description: 'Bóng bẩy, sang trọng' }
  ]

  const patterns = [
    { id: 'hoa-mai', name: 'Hoa mai', icon: Flower, description: 'Truyền thống' },
    { id: 'hoa-dao', name: 'Hoa đào', icon: Flower, description: 'Mùa xuân' },
    { id: 'hoa-sen', name: 'Hoa sen', icon: Flower, description: 'Thanh tao' },
    { id: 'phuong-hoang', name: 'Phượng hoàng', icon: Gem, description: 'Cung đình' },
    { id: 'long-phung', name: 'Long phụng', icon: Gem, description: 'Quý phái' }
  ]

  const colors = [
    { id: 'do', name: 'Đỏ', color: '#dc2626', description: 'Truyền thống' },
    { id: 'xanh', name: 'Xanh dương', color: '#2563eb', description: 'Thanh lịch' },
    { id: 'tim', name: 'Tím', color: '#7c3aed', description: 'Quý phái' },
    { id: 'hong', name: 'Hồng', color: '#ec4899', description: 'Dịu dàng' },
    { id: 'vang', name: 'Vàng', color: '#eab308', description: 'Rực rỡ' },
    { id: 'xanh-la', name: 'Xanh lá', color: '#16a34a', description: 'Tự nhiên' }
  ]

  const accessories = [
    { id: 'khan-dong', name: 'Khăn đóng', description: 'Truyền thống' },
    { id: 'no', name: 'Nơ', description: 'Hiện đại' },
    { id: 'kim-tuyen', name: 'Kim tuyến', description: 'Lấp lánh' },
    { id: 'ngoc-trai', name: 'Ngọc trai', description: 'Tinh tế' }
  ]

  const renderContent = () => {
    switch (selectedTool) {
      case 'style':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chọn kiểu áo dài</h3>
            <div className="grid grid-cols-1 gap-3">
              {aoDaiStyles.map((style) => (
                <motion.div
                  key={style.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <style.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{style.name}</h4>
                      <p className="text-sm text-gray-500">{style.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 'fabric':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chọn chất liệu</h3>
            <div className="grid grid-cols-1 gap-3">
              {fabrics.map((fabric) => (
                <motion.div
                  key={fabric.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{fabric.name}</h4>
                      <p className="text-sm text-gray-500">{fabric.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 'pattern':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chọn họa tiết</h3>
            <div className="grid grid-cols-1 gap-3">
              {patterns.map((pattern) => (
                <motion.div
                  key={pattern.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <pattern.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{pattern.name}</h4>
                      <p className="text-sm text-gray-500">{pattern.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 'color':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chọn màu sắc</h3>
            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => (
                <motion.div
                  key={color.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.color }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{color.name}</h4>
                      <p className="text-sm text-gray-500">{color.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 'accessories':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Chọn phụ kiện</h3>
            <div className="grid grid-cols-1 gap-3">
              {accessories.map((accessory) => (
                <motion.div
                  key={accessory.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-traditional-500 rounded-lg flex items-center justify-center">
                      <Gem className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{accessory.name}</h4>
                      <p className="text-sm text-gray-500">{accessory.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      {/* Tool Tabs */}
      <div className="flex flex-col space-y-2 mb-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              selectedTool === tool.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tool.icon className="h-5 w-5" />
            <span className="font-medium">{tool.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="border-t border-gray-200 pt-6">
        {renderContent()}
      </div>
    </div>
  )
}

export default DesignerPanel 