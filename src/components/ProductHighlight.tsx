import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const bullets = [
  'Tablets, Capsules & Injectables',
  'GCC & MENA Registered Products',
  'Full Regulatory Documentation',
  'Cold-Chain Capable Logistics',
];

export default function ProductHighlight() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-3">Featured Category</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1e35] mb-4 leading-tight">
              Finished Dosage Forms
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed mb-6">
              High-quality finished medicines across multiple therapeutic categories —
              antibiotics, anti-infectives, gastrointestinals, and respiratory — sourced
              exclusively from GMP-certified manufacturers.
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {bullets.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#374151]">
                  <CheckCircle2 size={16} className="text-[#1558a7] flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/products"
              className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2"
            >
              Explore Products
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
          >
            <div
              className="w-full h-72 lg:h-[340px] rounded-2xl relative overflow-hidden flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #c7d2fe 100%)' }}
              aria-label="Finished dosage forms visual"
            >
              {/* Decorative cards */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 px-8">
                {[
                  { color: '#1558a7', label: 'Antibiotics', count: '24 products' },
                  { color: '#0e9f6e', label: 'Vitamins', count: '18 products' },
                  { color: '#7c3aed', label: 'Analgesics', count: '12 products' },
                ].map((card, i) => (
                  <div
                    key={card.label}
                    className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 flex-1"
                    style={{ transform: `translateY(${i === 1 ? '-12px' : '8px'})` }}
                    aria-hidden="true"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: card.color + '15' }}
                    >
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: card.color }} />
                    </div>
                    <p className="text-xs font-semibold text-[#0f1e35]">{card.label}</p>
                    <p className="text-[11px] text-[#64748b]">{card.count}</p>
                  </div>
                ))}
              </div>

              {/* Badge overlay */}
              <div
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm flex items-center gap-2"
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-[#0e9f6e]" />
                <span className="text-xs font-semibold text-[#0f1e35]">GMP Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
