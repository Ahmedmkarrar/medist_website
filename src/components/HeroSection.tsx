import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  bgImage?: string;
  badge?: string;
  showStats?: boolean;
}

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '500+', label: 'Products' },
  { value: '50+', label: 'Global Suppliers' },
  { value: '30+', label: 'Countries Served' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  bgImage,
  badge,
  showStats = false,
}: HeroSectionProps) {
  return (
    <section className="hero-photo relative" style={{ minHeight: showStats ? '560px' : '420px' }} aria-label="Page hero">
      {/* Background */}
      {bgImage ? (
        <div
          className="hero-photo-bg"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="hero-photo-bg"
          style={{
            background: 'linear-gradient(135deg, #060e1c 0%, #0a1830 40%, #0e2240 70%, #0c1e3a 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Grid pattern overlay */}
      <div className="hero-grid-pattern absolute inset-0 z-[1]" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(21,88,167,0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 flex flex-col h-full">
        <div className="max-w-2xl flex-1">
          {/* Badge pill */}
          {badge && (
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] flex-shrink-0" aria-hidden="true" />
              <span className="text-white/80 text-xs font-medium">{badge}</span>
            </motion.div>
          )}

          <motion.h1
            custom={badge ? 1 : 0} variants={fadeUp} initial="hidden" animate="visible"
            className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-white leading-[1.12] tracking-tight mb-5"
          >
            {title}
          </motion.h1>

          <motion.p
            custom={badge ? 2 : 1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-white/65 text-base lg:text-lg leading-relaxed mb-8 max-w-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            custom={badge ? 3 : 2} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-3"
          >
            {primaryCta && (
              <Link
                to={primaryCta.to}
                className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2"
              >
                {primaryCta.label}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
            {secondaryCta && (
              <Link to={secondaryCta.to} className="btn-outline-white px-6 py-3 text-sm inline-block">
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </div>

        {/* Stats row */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: 'easeOut' as const }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center sm:text-left ${i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-8' : ''}`}
              >
                <p className="text-2xl lg:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-white/50 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
