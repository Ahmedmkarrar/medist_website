import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Lightbulb, Bell } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CtaBanner from '../components/CtaBanner';

const resources = [
  {
    icon: BookOpen,
    title: 'Catalogues & Brochures',
    desc: 'Download our full product catalogues, industry brochures, and supplier capability statements. Updated quarterly.',
    badge: 'Coming Soon',
    color: '#1558a7',
    lightBg: '#eff6ff',
  },
  {
    icon: FileText,
    title: 'Application Notes',
    desc: 'Technical application notes covering formulation guidance, usage levels, and ingredient performance data for each category.',
    badge: 'Coming Soon',
    color: '#0e9f6e',
    lightBg: '#ecfdf5',
  },
  {
    icon: Lightbulb,
    title: 'Case Studies',
    desc: 'Real-world examples of how Medist ingredients have helped clients solve formulation, regulatory, and supply-chain challenges.',
    badge: 'Coming Soon',
    color: '#7c3aed',
    lightBg: '#f5f3ff',
  },
  {
    icon: Bell,
    title: 'Regulatory Updates',
    desc: 'Latest regulatory developments across GCC markets — SFDA, MOH, UAE MoH, and international standards that affect your business.',
    badge: 'Coming Soon',
    color: '#c05621',
    lightBg: '#fff7ed',
  },
];

export default function ResourcesPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <main id="main-content">
      <HeroSection
        title="Resources & Technical Library"
        subtitle="Application notes, regulatory updates, catalogues, and case studies — everything you need to make informed sourcing decisions."
        primaryCta={{ label: 'Contact Us', to: '/contact' }}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="section-label mb-2">Knowledge Hub</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] max-w-xl">
              Technical resources for procurement &amp; R&amp;D teams
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resources.map(({ icon: Icon, title, desc, badge, color, lightBg }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white border border-[#e2e8f0] rounded-xl p-7 flex flex-col gap-5 card-hover relative overflow-hidden"
              >
                {/* Decorative corner gradient */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-[0.04]"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: lightBg }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} style={{ color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: lightBg, color }}
                  >
                    {badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0f1e35] mb-2">{title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>
                </div>

                <button
                  className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto opacity-50 cursor-not-allowed"
                  style={{ color }}
                  disabled
                  aria-disabled="true"
                >
                  Notify me when available
                </button>
              </motion.article>
            ))}
          </div>

          {/* Newsletter/Notify CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-base font-bold text-[#0f1e35] mb-1">
                Need technical data for a specific ingredient?
              </h3>
              <p className="text-sm text-[#64748b]">
                Contact our technical team for CoA, SDS, TDS, or application support.
              </p>
            </div>
            <a
              href="/contact?type=sds"
              className="btn-primary px-6 py-3 text-sm inline-block flex-shrink-0"
            >
              Request SDS / TDS
            </a>
          </motion.div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
