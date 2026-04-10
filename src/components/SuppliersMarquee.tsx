import { motion } from 'framer-motion';
import { suppliers } from '../data/suppliers';
import SupplierLogo from './SupplierLogo';

const doubled = [...suppliers, ...suppliers];

export default function SuppliersMarquee() {
  return (
    <section className="bg-[#F7F9FC] py-16 lg:py-20 overflow-hidden" aria-labelledby="suppliers-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[#0A8C7A] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
        >
          Our Partners
        </motion.p>
        <motion.h2
          id="suppliers-heading"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-[#0D1F3C] mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Our Trusted Global Suppliers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[#8A9BB0] text-base max-w-xl mx-auto"
        >
          Partnering with certified manufacturers across Europe, Asia, and the Americas.
        </motion.p>
      </div>

      <div className="marquee-wrapper relative" role="region" aria-label="Supplier logos carousel">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F7F9FC, transparent)' }}
          aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F7F9FC, transparent)' }}
          aria-hidden="true" />

        <div className="marquee-track py-3" aria-hidden="true">
          {doubled.map((supplier, i) => (
            <SupplierLogo key={`${supplier.name}-${i}`} supplier={supplier} />
          ))}
        </div>
      </div>
    </section>
  );
}
