import HeroSection from '../components/HeroSection';
import IndustriesSection from '../components/IndustriesSection';
import ProductHighlight from '../components/ProductHighlight';
import WhyMedist from '../components/WhyMedist';
import CertificationsSection from '../components/CertificationsSection';
import SuppliersMarquee from '../components/SuppliersMarquee';
import Testimonials from '../components/Testimonials';
import CtaBanner from '../components/CtaBanner';

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection
        title="Trusted Ingredients & Raw Materials for Pharma, Food & Personal Care"
        subtitle="From APIs to finished medicines, stabilisers to skin-care actives — Medist delivers quality-assured supply backed by technical expertise, regulatory compliance, and reliable distribution across GCC & MENA."
        primaryCta={{ label: 'Request a Sample', to: '/contact' }}
        secondaryCta={{ label: 'Explore Products', to: '/products' }}
        badge="Trusted by 500+ Manufacturers"
        showStats
      />
      <IndustriesSection />
      <ProductHighlight />
      <WhyMedist />
      <CertificationsSection />
      <SuppliersMarquee />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}
