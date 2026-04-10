import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlaskConical, Wheat, Sparkles, Microscope, ArrowRight } from 'lucide-react';

const industries = [
  {
    icon: FlaskConical,
    title: 'Pharmaceuticals',
    desc: 'APIs, excipients, finished dosage forms, and packaging components for pharma manufacturers across the GCC.',
    to: '/products?industry=pharma',
    accent: '#1558a7',
    lightBg: '#eff6ff',
  },
  {
    icon: Wheat,
    title: 'Food & Beverage',
    desc: 'Stabilizers, emulsifiers, flavourings, proteins, and functional ingredients for food production at scale.',
    to: '/products?industry=beverages',
    accent: '#0e9f6e',
    lightBg: '#ecfdf5',
  },
  {
    icon: Sparkles,
    title: 'Personal & Home Care',
    desc: 'Functional ingredients for skin care, hair care, oral hygiene, and household product formulations.',
    to: '/products?industry=personal',
    accent: '#7c3aed',
    lightBg: '#f5f3ff',
  },
  {
    icon: Microscope,
    title: 'Laboratory Equipment',
    desc: 'Analytical devices, QC instruments, formulation tools, and lab consumables for R&D and quality teams.',
    to: '/products?industry=lab',
    accent: '#c05621',
    lightBg: '#fff7ed',
  },
];

export default function IndustriesSection() {
  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="industries-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label mb-2">What We Serve</p>
          <h2 id="industries-heading" className="text-2xl lg:text-3xl font-bold text-[#0f1e35]">
            Industries We Serve
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map(({ icon: Icon, title, desc, to, accent, lightBg }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
              className="industry-card-wrap bg-white border border-[#e2e8f0] rounded-xl p-6 flex flex-col gap-4 card-hover group"
              style={{ '--accent': accent } as React.CSSProperties}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: lightBg }}
                aria-hidden="true"
              >
                <Icon size={22} strokeWidth={1.75} style={{ color: accent }} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#0f1e35] text-[15px] mb-2">{title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>
              </div>
              <Link
                to={to}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mt-auto"
                style={{ color: accent }}
                aria-label={`Explore ${title}`}
              >
                Explore
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
