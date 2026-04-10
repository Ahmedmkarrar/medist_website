import { motion } from 'framer-motion';
import { ShieldCheck, Snowflake, Headphones, Globe } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    body: 'GCC, SFDA, MOH, and international regulatory support — ensuring your products meet every market requirement, first time.',
    stat: 'GCC & MENA',
  },
  {
    icon: Snowflake,
    title: 'Cold Chain Solutions',
    body: 'Temperature-controlled logistics for biologics, vaccines, and sensitive pharmaceutical products with full monitoring.',
    stat: '2–8°C Certified',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    body: 'In-house application scientists and R&D advisors who help optimise your formulation and solve manufacturing challenges.',
    stat: 'Expert Team',
  },
  {
    icon: Globe,
    title: 'Global Supplier Network',
    body: 'Partnerships with 50+ certified manufacturers across Europe, Asia, and the Americas for uninterrupted, quality supply.',
    stat: '50+ Suppliers',
  },
];

export default function WhyMedist() {
  return (
    <section className="bg-[#0b1d35] py-16 lg:py-20" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa] mb-2">
            Our Advantage
          </p>
          <h2 id="why-heading" className="text-2xl lg:text-3xl font-bold text-white">
            Why Choose Medist?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, body, stat }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
              className="why-card rounded-xl p-6 flex flex-col gap-4"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(96,165,250,0.12)' }}
                aria-hidden="true"
              >
                <Icon size={20} className="text-[#60a5fa]" strokeWidth={1.75} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{body}</p>
              </div>

              {/* Stat chip */}
              <div className="mt-auto">
                <span className="inline-block text-[11px] font-semibold text-[#60a5fa] bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.2)] px-3 py-1 rounded-full">
                  {stat}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
