import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import DesignerPage from './pages/DesignerPage'
import ARTryOnPage from './pages/ARTryOnPage'
import GalleryPage from './pages/GalleryPage'
import SketchWeekPage from './pages/SketchWeekPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CommunityPage from './features/community/CommunityPage'
import MarketplacePage from './features/marketplace/MarketplacePage'
import EducationPage from './features/education/EducationPage'
import CopyrightProtection from './features/copyright/CopyrightProtection'
import { useLocation } from 'react-router-dom'
import ProfileUser from './pages/ProfilePage'
function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-orange-50">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-20"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/designer" element={<DesignerPage />} />
            <Route path="/ar-try-on" element={<ARTryOnPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/sketch-week" element={<SketchWeekPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/copyright" element={<CopyrightProtection />} />
            <Route path="/profileuser" element={<ProfileUser />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App 