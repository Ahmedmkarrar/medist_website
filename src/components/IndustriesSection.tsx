import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { industries } from '../data/industries';
import IndustryIcon from './IndustryIcon';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

export default function IndustriesSection() {
  return (
    <section className="bg-[#F7F9FC] py-20 lg:py-28" aria-labelledby="industries-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#0A8C7A] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          >
            Product Portfolio
          </motion.p>
          <motion.h2
            id="industries-heading"
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-[#0D1F3C] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What We Supply
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#8A9BB0] text-lg max-w-2xl mx-auto"
          >
            Specialized ingredients for every sector — sourced globally, delivered with precision.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none"
          role="list"
        >
          {industries.map((industry) => (
            <motion.li key={industry.id} variants={cardVariants}>
              <article
                className="industry-card bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col cursor-default"
                style={{ '--accent-color': industry.color } as React.CSSProperties}
              >
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${industry.color}18` }}
                    aria-hidden="true"
                  >
                    <span style={{ color: industry.color }}>
                      <IndustryIcon id={industry.icon} size={22} />
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0D1F3C] text-[15px] leading-snug">{industry.name}</h3>
                </div>

                {/* Top 4 products */}
                <ul className="flex flex-col gap-2 flex-1 list-none mb-4" role="list">
                  {industry.products.slice(0, 4).map((product) => (
                    <li key={product} className="text-sm text-[#8A9BB0] flex items-start gap-2">
                      <span
                        className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: industry.color }}
                        aria-hidden="true"
                      />
                      {product}
                    </li>
                  ))}
                  {industry.products.length > 4 && (
                    <li className="text-xs text-[#8A9BB0] pl-3 italic">
                      +{industry.products.length - 4} more products…
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    to={`/products?industry=${industry.id}`}
                    className="text-sm font-semibold transition-colors inline-flex items-center gap-1 hover:gap-2"
                    style={{ color: industry.color }}
                    aria-label={`View all ${industry.name}`}
                  >
                    View All Products →
                  </Link>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
