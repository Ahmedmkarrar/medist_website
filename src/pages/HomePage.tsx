import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import IndustriesSection from '../components/IndustriesSection';
import SuppliersMarquee from '../components/SuppliersMarquee';
import CertificationsSection from '../components/CertificationsSection';
import WhyMedist from '../components/WhyMedist';
import ProcessSection from '../components/ProcessSection';
import CtaBanner from '../components/CtaBanner';

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <TrustBar />
      <IndustriesSection />
      <SuppliersMarquee />
      <CertificationsSection />
      <WhyMedist />
      <ProcessSection />
      <CtaBanner />
    </main>
  );
}
