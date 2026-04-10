import { motion } from 'framer-motion';

const certs = [
  { label: 'ISO 22000', sub: 'Food Safety Management' },
  { label: 'cGMP',      sub: 'Current Good Mfg Practice' },
  { label: 'GMP',       sub: 'Good Manufacturing Practice' },
  { label: 'Halal',     sub: 'Internationally Certified' },
  { label: 'Kosher',    sub: 'Certified' },
];

export default function CertificationsSection() {
  return (
    <section className="bg-white border-y border-[#e2e8f0] py-12" aria-label="Certifications and compliance standards">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="section-label text-center mb-8"
        >
          Certifications &amp; Compliance
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {certs.map((cert, i) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              className="cert-badge flex flex-col items-center gap-2 text-center rounded-xl px-5 py-4 min-w-[90px]"
            >
              <span className="text-[#1558a7] font-bold text-sm leading-tight">{cert.label}</span>
              <span className="text-[10px] text-[#64748b] leading-snug max-w-[80px]">{cert.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
