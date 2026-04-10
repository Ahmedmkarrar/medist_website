import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Medist has been an invaluable procurement partner for our pharmaceutical distribution chain. Their regulatory documentation is always complete, accurate, and delivered on time.',
    name: 'Regional Procurement Director',
    company: 'Gulf Pharma Holdings',
    initials: 'GP',
  },
  {
    quote: "Working with Medist transformed our R&D timelines. Sample turnaround is fast and their technical team genuinely understands food formulation challenges at an industrial scale.",
    name: 'R&D Manager',
    company: 'Emirates Food Industries',
    initials: 'EF',
  },
  {
    quote: 'Ingredients sourced with complete supply-chain traceability. Exactly what we need to satisfy our GCC customers — Medist makes compliance straightforward.',
    name: 'Supply Chain Director',
    company: 'Global Contract Manufacturer',
    initials: 'GC',
  },
];

const stars = Array(5).fill(null);

export default function Testimonials() {
  return (
    <section className="bg-[#f8fafc] py-16 lg:py-20" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-2">Client Testimonials</p>
          <h2 id="testimonials-heading" className="text-2xl lg:text-3xl font-bold text-[#0f1e35]">
            What Our Partners Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.company}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
              className="testimonial-card bg-white border border-[#e2e8f0] rounded-xl p-6 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label="5 out of 5 stars" role="img">
                {stars.map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#374151] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 pt-2 border-t border-[#f1f5f9]">
                <div
                  className="w-9 h-9 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-[#1558a7] text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f1e35] leading-none mb-0.5">{t.name}</p>
                  <p className="text-xs text-[#64748b]">{t.company}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
