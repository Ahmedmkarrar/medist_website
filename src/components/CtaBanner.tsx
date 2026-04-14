import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CtaBannerProps {
  quote?: string;
  quoteHighlight?: string;
  ctaTitle?: string;
  ctaBody?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}

export default function CtaBanner({
  quote = "In our field, reputation is not built through claims. It is built through repeated delivery under pressure.",
  quoteHighlight = "Medist maintains a clear standard: every commitment is supported by structure, and every structure is executed with precision.",
  ctaTitle = "Structured Trade. Reliable Outcomes.",
  ctaBody = "Whether you are expanding into new markets or securing critical supply, Medist operates to ensure continuity, compliance, and control at every stage.",
  primaryCta = { label: 'Contact Medist', to: '/contact' },
  secondaryCta = { label: 'Explore Products', to: '/products' },
}: CtaBannerProps) {
  return (
    <>
      {/* Quote block */}
      <section className="bg-white py-10 lg:py-14" aria-label="Company quote">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-2xl px-10 py-10 lg:py-12"
            style={{ background: 'linear-gradient(135deg, #0b1d35 0%, #0f3a5e 100%)' }}
          >
            <p className="text-white text-lg lg:text-xl leading-relaxed max-w-4xl">
              {quote}{' '}
              <strong className="text-white font-semibold">{quoteHighlight}</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA box */}
      <section
        className="bg-[#f6f8fa] border-t border-[#e2e8f0] py-16 lg:py-20 text-center"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-white border border-[#e2e8f0] rounded-2xl px-8 py-12 shadow-[0_12px_32px_rgba(16,32,42,0.07)] max-w-3xl mx-auto"
          >
            <h2
              id="cta-heading"
              className="text-2xl lg:text-[2rem] font-bold text-[#0f1e35] leading-snug tracking-tight mb-4"
            >
              {ctaTitle}
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed mb-8 max-w-xl mx-auto">
              {ctaBody}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to={primaryCta.to} className="btn-navy px-7 py-3.5 text-sm">
                {primaryCta.label}
              </Link>
              <Link to={secondaryCta.to} className="btn-secondary px-7 py-3.5 text-sm">
                {secondaryCta.label}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
