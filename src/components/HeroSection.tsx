import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  /** Single background image (kept for backward compatibility). */
  backgroundImage?: string;
  /** Multiple images → auto-rotating crossfade slideshow. Takes precedence over backgroundImage. */
  backgroundImages?: string[];
  /** Seconds each slide is shown before crossfading to the next. */
  slideInterval?: number;
}

/** Crossfading background slideshow. Renders a single static image when given one. */
function HeroSlideshow({ images, intervalMs }: { images: string[]; intervalMs: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex(i => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images[index]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>
    </div>
  );
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
  backgroundImage,
  backgroundImages,
  slideInterval = 5,
}: HeroSectionProps) {
  const images = backgroundImages ?? (backgroundImage ? [backgroundImage] : []);
  const dark = images.length > 0;
  return (
    <section
      style={dark ? undefined : { background: 'linear-gradient(180deg, #ffffff 0%, #f6f8fa 100%)' }}
      className={`relative overflow-hidden ${dark ? 'py-24 lg:py-32' : 'py-20 lg:py-28'}`}
      aria-label="Page hero"
    >
      {dark && (
        <>
          {/* Rotating background slideshow */}
          <HeroSlideshow images={images} intervalMs={slideInterval * 1000} />
          {/* Overall darken so navy/white text stays legible */}
          <div className="absolute inset-0 bg-[#06121f]/45" aria-hidden="true" />
          {/* Stronger gradient on the left where the text sits (open water side) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06121f]/85 via-[#06121f]/40 to-transparent" aria-hidden="true" />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
                className={`block mb-4 text-[11px] font-bold tracking-[0.16em] uppercase ${dark ? 'text-[#9ec5f2]' : 'text-[#1558a7]'}`}
              >
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              custom={eyebrow ? 1 : 0} variants={fadeUp} initial="hidden" animate="visible"
              className={`text-4xl lg:text-[52px] font-bold leading-[1.08] tracking-tight mb-5 ${dark ? 'text-white' : 'text-[#0f1e35]'}`}
            >
              {title}
            </motion.h1>

            <motion.p
              custom={eyebrow ? 2 : 1} variants={fadeUp} initial="hidden" animate="visible"
              className={`text-lg leading-relaxed max-w-xl ${dark ? 'text-white/85' : 'text-[#64748b]'}`}
              style={{ marginBottom: subtitleExtra ? '12px' : '2rem' }}
            >
              {subtitle}
            </motion.p>

            {subtitleExtra && (
              <motion.p
                custom={eyebrow ? 3 : 2} variants={fadeUp} initial="hidden" animate="visible"
                className={`text-lg leading-relaxed mb-8 max-w-xl ${dark ? 'text-white/75' : 'text-[#64748b]'}`}
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
                    className={`${dark ? 'btn-primary' : 'btn-navy'} px-7 py-3.5 text-sm`}
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    to={secondaryCta.to}
                    className={`${dark ? 'btn-outline-white' : 'btn-secondary'} px-7 py-3.5 text-sm`}
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
