import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' as const } },
};

const floatAnim: Variants = {
  animate: {
    y: [0, -16, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const industries = ['Bakery', 'Confectionery', 'Dairy', 'Beverages', 'Snacks', 'Culinary', 'Meat'];

export default function HeroSection() {
  return (
    <section className="hero-gradient min-h-screen relative flex flex-col justify-center overflow-hidden" aria-label="Hero">
      {/* Dot grid overlay */}
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Radial glow accents */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at 70% 30%, #0A8C7A, transparent 65%)' }}
        aria-hidden="true" />
      <div className="absolute bottom-0 left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 65%)' }}
        aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 lg:pt-36 lg:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Pill badge */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(10,140,122,0.12)', border: '1px solid rgba(13,184,158,0.3)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#0DB89E] animate-pulse" aria-hidden="true" />
              <span className="text-[#0DB89E] text-xs font-semibold uppercase tracking-widest">
                Trusted Ingredient Partner — Middle East & Beyond
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="text-white">Premium Raw</span>{' '}
              <span className="gradient-text-teal">Ingredients</span>
              <br />
              <span className="text-white">Delivered with</span>{' '}
              <span className="gradient-text-gold">Precision</span>
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-[#8A9BB0] text-lg leading-relaxed mb-10 max-w-[520px]"
            >
              Medist is your trusted partner for sourcing the finest raw ingredients and
              materials for the Pharmaceutical, Food &amp; Beverage, and Personal Care
              industries across the Middle East and beyond.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
              <Link to="/products" className="btn-teal inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-full text-sm">
                Explore Our Products
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 hover:border-white/50 text-white font-semibold rounded-full text-sm transition-all duration-200 hover:bg-white/6 active:scale-[0.97]"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Industry tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {industries.map(ind => (
                <span
                  key={ind}
                  className="px-3 py-1 rounded-full text-xs font-medium text-[#8A9BB0]"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {ind}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Molecular illustration ── */}
          <motion.div
            variants={floatAnim}
            animate="animate"
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <MolecularSVG />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" aria-hidden="true">
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </div>
    </section>
  );
}

function MolecularSVG() {
  return (
    <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer dashed rings */}
      <circle cx="250" cy="250" r="220" stroke="#0A8C7A" strokeWidth="1" strokeDasharray="10 7" opacity="0.2" />
      <circle cx="250" cy="250" r="170" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="6 10" opacity="0.18" />
      <circle cx="250" cy="250" r="120" stroke="#0A8C7A" strokeWidth="0.6" strokeDasharray="4 8" opacity="0.15" />

      {/* Core glow */}
      <circle cx="250" cy="250" r="60" fill="#0A8C7A" opacity="0.08" />
      <circle cx="250" cy="250" r="38" fill="#0A8C7A" opacity="0.15" />
      <circle cx="250" cy="250" r="20" fill="#0DB89E" opacity="0.85" />

      {/* Orbiting atoms */}
      <circle cx="350" cy="155" r="26" fill="#0A8C7A" opacity="0.3" />
      <circle cx="350" cy="155" r="12" fill="#0DB89E" opacity="0.75" />

      <circle cx="155" cy="170" r="22" fill="#C9A84C" opacity="0.3" />
      <circle cx="155" cy="170" r="9"  fill="#C9A84C" opacity="0.85" />

      <circle cx="340" cy="345" r="20" fill="#0A8C7A" opacity="0.28" />
      <circle cx="340" cy="345" r="9"  fill="#0DB89E" opacity="0.75" />

      <circle cx="160" cy="335" r="24" fill="#0A8C7A" opacity="0.25" />
      <circle cx="160" cy="335" r="10" fill="#0DB89E" opacity="0.65" />

      <circle cx="250" cy="88"  r="18" fill="#C9A84C" opacity="0.4" />
      <circle cx="250" cy="88"  r="7"  fill="#E8C96A" opacity="0.9" />

      <circle cx="250" cy="410" r="15" fill="#0A8C7A" opacity="0.35" />
      <circle cx="250" cy="410" r="6"  fill="#0DB89E" opacity="0.8" />

      <circle cx="418" cy="250" r="12" fill="#0DB89E" opacity="0.45" />
      <circle cx="82"  cy="250" r="12" fill="#0DB89E" opacity="0.45" />

      {/* Bond lines */}
      <line x1="250" y1="230" x2="340" y2="170" stroke="#0A8C7A" strokeWidth="1.5" opacity="0.35" />
      <line x1="250" y1="230" x2="162" y2="178" stroke="#C9A84C" strokeWidth="1.5" opacity="0.3" />
      <line x1="250" y1="270" x2="338" y2="333" stroke="#0A8C7A" strokeWidth="1.5" opacity="0.3" />
      <line x1="250" y1="270" x2="162" y2="323" stroke="#0A8C7A" strokeWidth="1.5" opacity="0.25" />
      <line x1="250" y1="212" x2="250" y2="106" stroke="#C9A84C" strokeWidth="1.5" opacity="0.3" />
      <line x1="250" y1="288" x2="250" y2="395" stroke="#0A8C7A" strokeWidth="1.5" opacity="0.25" />
      <line x1="268" y1="250" x2="406" y2="250" stroke="#0A8C7A" strokeWidth="1"   opacity="0.2" />
      <line x1="232" y1="250" x2="94"  y2="250" stroke="#0A8C7A" strokeWidth="1"   opacity="0.2" />

      {/* Hexagon overlay */}
      <polygon
        points="250,200 293,225 293,275 250,300 207,275 207,225"
        stroke="#0A8C7A" strokeWidth="1" fill="none" opacity="0.18"
      />

      {/* Small accent dots */}
      <circle cx="390" cy="130" r="5" fill="#C9A84C" opacity="0.5" />
      <circle cx="112" cy="128" r="5" fill="#0DB89E" opacity="0.5" />
      <circle cx="390" cy="370" r="5" fill="#0DB89E" opacity="0.5" />
      <circle cx="112" cy="372" r="5" fill="#C9A84C" opacity="0.5" />
      <circle cx="420" cy="200" r="3" fill="#0DB89E" opacity="0.4" />
      <circle cx="80"  cy="300" r="3" fill="#C9A84C" opacity="0.4" />
    </svg>
  );
}
