import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const bullets = [
  'APIs, Excipients & Finished Dosage Forms',
  'GCC & MENA Registered Products',
  'Full Regulatory Documentation (CoA, SDS, TDS)',
  'Cold-Chain & GDP-Compliant Logistics',
];

const heroImage = {
  src: '/supp_pics/heungsoon-approximately-3887443_1920.jpg',
  alt: 'Pharmaceutical softgel capsule held by precision tweezers',
};

const stackedThumbs = [
  {
    src: '/supp_pics/monfocus-fish-oil-1915425_1920.jpg',
    alt: 'Yellow fish oil softgel capsules',
  },
  {
    src: '/supp_pics/peterfranz-tablets-2142856_1920.jpg',
    alt: 'Amber softgels and white tablets in blister packs',
  },
];

const galleryImages = [
  {
    src: '/supp_pics/ajs1-pill-5263028_1920.jpg',
    alt: 'Teal gel capsules on a soft surface',
    caption: 'Softgel Capsules',
  },
  {
    src: '/supp_pics/pexels-castorlystock-4058117.jpg',
    alt: 'Scattered teal pills on white background',
    caption: 'Coated Tablets',
  },
  {
    src: '/supp_pics/nonbye-pills-4883677_1920.jpg',
    alt: 'Green capsules viewed through a green container',
    caption: 'Liquid-Filled Capsules',
  },
  {
    src: '/supp_pics/pexels-artem-anosov-1933761-31756248.jpg',
    alt: 'Hand holding assorted capsules and tablets',
    caption: 'Finished Dosage Forms',
  },
];

export default function ProductHighlight() {
  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="pharma-showcase-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Top row: text + image collage ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-3">Featured Capability</p>
            <h2
              id="pharma-showcase-heading"
              className="text-3xl lg:text-4xl font-bold text-[#0f1e35] mb-4 leading-tight"
            >
              Pharmaceutical Materials & Finished Dosage Forms
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed mb-6">
              From active pharmaceutical ingredients to finished tablets, capsules,
              and injectables — sourced exclusively from GMP-certified manufacturers
              and supported by complete regulatory documentation for the GCC and MENA markets.
            </p>

            <ul className="flex flex-col gap-3 mb-8 list-none">
              {bullets.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#374151]">
                  <CheckCircle2 size={16} className="text-[#1558a7] flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/products?industry=pharma"
              className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2"
            >
              Explore Pharma Products
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="grid grid-cols-5 grid-rows-2 gap-3 h-72 lg:h-[380px]">
              {/* Large hero image */}
              <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(16,32,42,0.10)]">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Two stacked thumbs */}
              {stackedThumbs.map(thumb => (
                <div
                  key={thumb.src}
                  className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(16,32,42,0.08)]"
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* GMP Certified floating badge */}
            <div
              className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2"
              aria-hidden="true"
            >
              <div className="w-2 h-2 rounded-full bg-[#0e9f6e]" />
              <span className="text-xs font-semibold text-[#0f1e35]">GMP Certified Suppliers</span>
            </div>
          </motion.div>
        </div>

        {/* ── Gallery strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-14 lg:mt-16"
        >
          <p className="section-label mb-4">Across Dosage Formats</p>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 list-none">
            {galleryImages.map(img => (
              <li
                key={img.src}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-[0_4px_12px_rgba(16,32,42,0.06)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e35]/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-semibold tracking-wide">
                  {img.caption}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
