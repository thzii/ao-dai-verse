import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'


interface DesignerCanvasProps {
  selectedTool: string
}

const AoDaiModel = () => {
  const { scene } = useGLTF('/aodailumla.glb')
  return <primitive object={scene} scale={1.5} />
}


const DesignerCanvas = ({ selectedTool }: DesignerCanvasProps) => {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Canvas Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Xem trước thiết kế</h3>
            <p className="text-sm text-gray-600">Công cụ đang chọn: {selectedTool}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              Xoay
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              Zoom
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full pt-20">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            
            <AoDaiModel />
            
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
            
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      {/* Canvas Overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Thiết kế hiện tại</h4>
              <p className="text-sm text-gray-600">Áo dài cách tân - Lụa tơ tằm - Hoa mai</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Lưu thiết kế
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Chia sẻ
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải mô hình 3D...</p>
        </div>
      </div>
    </div>
  )
}

export default DesignerCanvas 