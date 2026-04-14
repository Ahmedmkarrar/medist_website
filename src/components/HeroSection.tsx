import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroCard {
  heading: string;
  items: string[];
}

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  subtitleExtra?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  card?: HeroCard;
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  subtitleExtra,
  primaryCta,
  secondaryCta,
  card,
}: HeroSectionProps) {
  return (
    <section
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f6f8fa 100%)' }}
      className="py-20 lg:py-28"
      aria-label="Page hero"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={
            card
              ? 'grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center'
              : ''
          }
        >
          {/* Left — text */}
          <div className={card ? '' : 'max-w-2xl'}>
            {eyebrow && (
              <motion.span
                custom={0} variants={fadeUp} initial="hidden" animate="visible"
                className="section-label block mb-4"
              >
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              custom={eyebrow ? 1 : 0} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl lg:text-[52px] font-bold text-[#0f1e35] leading-[1.08] tracking-tight mb-5"
            >
              {title}
            </motion.h1>

            <motion.p
              custom={eyebrow ? 2 : 1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[#64748b] text-lg leading-relaxed max-w-xl"
              style={{ marginBottom: subtitleExtra ? '12px' : '2rem' }}
            >
              {subtitle}
            </motion.p>

            {subtitleExtra && (
              <motion.p
                custom={eyebrow ? 3 : 2} variants={fadeUp} initial="hidden" animate="visible"
                className="text-[#64748b] text-lg leading-relaxed mb-8 max-w-xl"
              >
                {subtitleExtra}
              </motion.p>
            )}

            {(primaryCta || secondaryCta) && (
              <motion.div
                custom={eyebrow ? (subtitleExtra ? 4 : 3) : 2} variants={fadeUp} initial="hidden" animate="visible"
                className="flex flex-wrap gap-3"
              >
                {primaryCta && (
                  <Link
                    to={primaryCta.to}
                    className="btn-navy px-7 py-3.5 text-sm"
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    to={secondaryCta.to}
                    className="btn-secondary px-7 py-3.5 text-sm"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* Right — info card */}
          {card && (
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: 'easeOut' }}
              className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-[0_12px_32px_rgba(16,32,42,0.08)]"
            >
              <h3 className="text-sm font-semibold text-[#0f1e35] mb-5">{card.heading}</h3>
              <ul className="flex flex-col gap-3.5 list-none">
                {card.items.map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[#64748b] leading-relaxed"
                  >
                    <span className="text-[#1558a7] font-bold flex-shrink-0 mt-px">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}
