import { motion, type Variants } from 'framer-motion';
import { Globe, ShieldCheck, Users, Zap, Award, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Global Sourcing Network',
    body: 'We partner with 50+ certified suppliers across Europe, Asia, and the Americas to bring you the world\'s finest ingredients.',
    color: '#0A8C7A',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    body: 'Every ingredient we source meets the highest international standards — Halal, Kosher, ISO, BRC, and FSSC 22000 certified.',
    color: '#3B82F6',
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    body: 'Our team of ingredient specialists works closely with your R&D to find the exact solution for your formulation.',
    color: '#8B5CF6',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    body: 'Samples dispatched within 72 hours. Commercial orders delivered on-schedule with full documentation and traceability.',
    color: '#F59E0B',
  },
  {
    icon: Award,
    title: '20+ Years Experience',
    body: 'Two decades of deep industry knowledge, supplier relationships, and regulatory expertise across the MENA region.',
    color: '#C9A84C',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    body: 'We don\'t just source ingredients — we invest in your success, providing ongoing formulation support and market intelligence.',
    color: '#10B981',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

export default function WhyMedist() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="why-medist-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#0A8C7A] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          >
            Why Choose Medist
          </motion.p>
          <motion.h2
            id="why-medist-heading"
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-[#0D1F3C] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Medist Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#8A9BB0] text-lg max-w-xl mx-auto"
          >
            Decades of expertise. Unwavering commitment to quality. A partner you can trust.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, body, color }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              className="rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              style={{ background: '#FAFBFC' }}
            >
              <div
                className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}15`, width: '52px', height: '52px' }}
                aria-hidden="true"
              >
                <Icon size={24} style={{ color }} strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-[#0D1F3C] mb-2">{title}</h3>
              <p className="text-[#8A9BB0] text-sm leading-relaxed">{body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
