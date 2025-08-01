
import HeroSection from '../components/home/HeroSection'
import FeaturesSection from '../components/home/FeaturesSection'
import AoDaiTypesSection from '../components/home/AoDaiTypesSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CTASection from '../components/home/CTASection'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Ao Dai Types Section */}
      <AoDaiTypesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

export default HomePage 