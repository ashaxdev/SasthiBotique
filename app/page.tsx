import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/shop/HeroSection';
import FeaturedCategories from '@/components/shop/FeaturedCategories';
import FeaturedProducts from '@/components/shop/FeaturedProducts';
import BannerSection from '@/components/shop/BannerSection';
import TestimonialsSection from '@/components/shop/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts title="New Arrivals" filter="newArrival" />
        <BannerSection />
        <FeaturedProducts title="Bestsellers" filter="bestseller" />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
