import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface SubcategorySlideshowProps {
  images?: string[];
  /** Category accent colour — used for the empty-state tint and dots. */
  color: string;
  name: string;
  /** Seconds per slide before auto-advancing. */
  interval?: number;
}

/**
 * Image band shown inside a sub-category section. Renders a crossfading
 * slideshow when images are supplied, or a tasteful reserved placeholder
 * (so the space is ready for imagery) when none are set yet.
 */
export default function SubcategorySlideshow({ images, color, name, interval = 4 }: SubcategorySlideshowProps) {
  const slides = images ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), interval * 1000);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  // ── Empty state — reserved space for upcoming imagery ──
  if (slides.length === 0) {
    return (
      <div
        className="relative h-44 sm:h-52 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 border border-dashed"
        style={{ backgroundColor: color + '0d', borderColor: color + '33' }}
        aria-hidden="true"
      >
        <Images size={26} style={{ color: color + 'aa' }} strokeWidth={1.5} />
        <span className="text-xs font-medium" style={{ color: color + 'aa' }}>Product imagery</span>
      </div>
    );
  }

  const go = (n: number) => setIndex((n + slides.length) % slides.length);

  return (
    <div className="relative h-44 sm:h-56 lg:h-64 rounded-xl overflow-hidden bg-[#0f1e35]">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[index]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label={`${name} imagery ${index + 1} of ${slides.length}`}
        />
      </AnimatePresence>
      {/* Subtle bottom gradient so controls stay legible */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#06121f]/60 to-transparent" aria-hidden="true" />

      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#0f1e35] flex items-center justify-center shadow-sm transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#0f1e35] flex items-center justify-center shadow-sm transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ backgroundColor: i === index ? '#ffffff' : 'rgba(255,255,255,0.45)' }}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
