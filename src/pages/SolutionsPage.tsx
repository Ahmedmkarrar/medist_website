import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, FlaskConical, FileCheck, BookOpen } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CtaBanner from '../components/CtaBanner';

const solutions = [
  {
    icon: Truck,
    title: 'Distribution & Cold Chain',
    body: 'End-to-end logistics covering ambient, chilled, and frozen distribution across the GCC — with full cold-chain monitoring and documentation for temperature-sensitive products.',
    image: true,
  },
  {
    icon: FlaskConical,
    title: 'Application & Formulation Support',
    body: 'Our in-house application scientists work directly with your R&D teams to optimise formulations, run trials, and identify the most cost-effective ingredient solutions.',
    image: true,
  },
  {
    icon: FileCheck,
    title: 'Regulatory & Compliance',
    body: 'Full dossier preparation, product registration support, and ongoing compliance monitoring across SFDA, MOH, and other GCC regulatory authorities.',
    image: false,
  },
  {
    icon: BookOpen,
    title: 'Trade & Documentation',
    body: 'We handle all import documentation, certificates of analysis, Halal/Kosher certificates, and regulatory paperwork — ensuring seamless customs clearance every time.',
    image: false,
  },
];

export default function SolutionsPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <main id="main-content">
      <HeroSection
        title="Comprehensive Solutions for Every Industry"
        subtitle="Beyond ingredients — we deliver the expertise, logistics, and regulatory support that keeps your supply chain moving."
        primaryCta={{ label: 'Contact Us Today', to: '/contact' }}
        secondaryCta={{ label: 'Our Products', to: '/products' }}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {solutions.map(({ icon: Icon, title, body, image }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-5"
              >
                <div className={`grid ${image ? 'sm:grid-cols-[1fr_180px]' : ''} gap-5 items-start`}>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#eff6ff] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Icon size={20} className="text-[#1d5fa8]" strokeWidth={1.75} />
                      </div>
                      <h2 className="text-base font-bold text-[#0f1e35]">{title}</h2>
                    </div>
                    <p className="text-sm text-[#64748b] leading-relaxed">{body}</p>
                  </div>
                  {image && (
                    <div
                      className="rounded-lg overflow-hidden h-32 sm:h-full bg-[#f1f5f9] flex items-center justify-center"
                      aria-label={`${title} image placeholder`}
                    >
                      <p className="text-xs text-[#94a3b8] text-center px-2">Photo</p>
                    </div>
                  )}
                </div>
                <hr className="border-[#e2e8f0]" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
