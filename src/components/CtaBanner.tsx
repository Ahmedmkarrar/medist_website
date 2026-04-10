import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section
      className="relative overflow-hidden py-16 lg:py-20"
      style={{ background: 'linear-gradient(135deg, #060e1c 0%, #0a1830 50%, #0e2240 100%)' }}
      aria-labelledby="cta-heading"
    >
      {/* Grid overlay */}
      <div className="hero-grid-pattern absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Radial accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(21,88,167,0.2) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="max-w-xl text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <FlaskConical size={13} className="text-[#60a5fa]" aria-hidden="true" />
              <span className="text-white/80 text-xs font-medium">Ready to source with confidence?</span>
            </div>

            <h2 id="cta-heading" className="text-2xl lg:text-[34px] font-bold text-white leading-tight mb-3">
              Looking for a Reliable Ingredient Partner?
            </h2>
            <p className="text-white/55 text-base leading-relaxed">
              Get in touch with our team for samples, pricing, regulatory documentation,
              and everything you need to move your project forward.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
          >
            <Link
              to="/contact"
              className="btn-primary px-7 py-3.5 text-sm inline-flex items-center gap-2"
            >
              Contact Us Today
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              to="/products"
              className="btn-outline-white px-7 py-3.5 text-sm inline-flex items-center gap-2"
            >
              Browse Products
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
