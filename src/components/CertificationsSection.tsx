import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const certs = [
  { name: 'Halal Certified',    body: 'IFANCA / JAKIM',         desc: 'All ingredients meet strict Halal compliance standards for Muslim markets.' },
  { name: 'Kosher Certified',   body: 'OU Kosher',              desc: 'Verified Kosher certification for applicable ingredient categories.' },
  { name: 'ISO 22000',          body: 'Food Safety Mgmt.',      desc: 'Suppliers audited to ISO 22000 food safety management systems.' },
  { name: 'BRC Global Standard',body: 'Grade A Suppliers',      desc: 'British Retail Consortium audited supply chain partners.' },
  { name: 'FSSC 22000',         body: 'Food Safety System',     desc: 'GFSI-benchmarked food safety certification across the supply chain.' },
  { name: 'Non-GMO',            body: 'Identity Preserved',     desc: 'Non-GMO verified options available for key ingredient categories.' },
];

export default function CertificationsSection() {
  return (
    <section className="bg-white py-20 lg:py-24" aria-labelledby="certs-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left text */}
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#0A8C7A] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            >
              Quality Assurance
            </motion.p>
            <motion.h2
              id="certs-heading"
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-[#0D1F3C] mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Every Ingredient, <br />
              <span className="gradient-text-teal">Every Standard</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#8A9BB0] text-base leading-relaxed mb-6"
            >
              We work exclusively with suppliers who hold internationally recognised
              certifications. Whether you require Halal, Kosher, BRC, or FSSC 22000 —
              Medist has you covered across every market and every regulatory requirement.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.18 }}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(10,140,122,0.06)', border: '1px solid rgba(10,140,122,0.15)' }}
            >
              <ShieldCheck size={22} className="text-[#0A8C7A] flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-[#0D1F3C] font-medium">
                Full documentation and certificates available on request for every product.
              </p>
            </motion.div>
          </div>

          {/* Right cert badges grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {certs.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="cert-badge rounded-2xl p-5 flex flex-col gap-1"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0A8C7A]/10 flex items-center justify-center mb-2" aria-hidden="true">
                  <ShieldCheck size={16} className="text-[#0A8C7A]" />
                </div>
                <p className="font-bold text-[#0D1F3C] text-sm">{cert.name}</p>
                <p className="text-[#0A8C7A] text-xs font-semibold">{cert.body}</p>
                <p className="text-[#8A9BB0] text-xs leading-relaxed mt-1">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
