import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section
      className="bg-[#071228] diagonal-stripe py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Teal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(10,140,122,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[#0DB89E] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
        >
          Get Started Today
        </motion.p>

        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ready to Elevate Your{' '}
          <span className="gradient-text-teal">Formulations?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="text-[#8A9BB0] text-lg mb-10 max-w-xl mx-auto"
        >
          Get in touch with our team of specialists today and discover the Medist difference.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="btn-teal inline-flex items-center gap-2 px-9 py-4 text-white text-base font-semibold rounded-full"
          >
            Request a Quote
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-9 py-4 border border-white/20 hover:border-white/40 text-white text-base font-semibold rounded-full transition-all duration-200 hover:bg-white/5"
          >
            Browse Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
