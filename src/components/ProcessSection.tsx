import { motion } from 'framer-motion';
import { ClipboardList, Search, FlaskConical, Truck } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Share Your Requirements',
    body: 'Tell us your application, volume, certifications needed, and target market. Our team will scope the right ingredient solution.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Sourcing & Supplier Match',
    body: 'We tap our global supplier network to identify certified, best-in-class manufacturers that meet your exact specification.',
  },
  {
    icon: FlaskConical,
    step: '03',
    title: 'Samples & Technical Review',
    body: 'Samples are dispatched with full technical datasheets, COAs, and certification documentation for your R&D team to evaluate.',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Order & Delivery',
    body: 'Once approved, we handle logistics, import documentation, and ensure timely delivery to your facility — anywhere in the region.',
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-[#071228] py-20 lg:py-28" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#0DB89E] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            From Enquiry to Delivery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#8A9BB0] text-base max-w-xl mx-auto"
          >
            A simple, transparent process that gets you the right ingredient, fast.
          </motion.p>
        </div>

        {/* Grid — connector line is a single absolute rule behind the icons, not per-card */}
        <div className="relative">
          {/* Single horizontal connector spanning all icons (desktop only) */}
          <div
            className="hidden lg:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-[2px]"
            style={{ background: 'linear-gradient(to right, rgba(10,140,122,0.6), rgba(10,140,122,0.15))' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ icon: Icon, step, title, body }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ background: 'rgba(10,140,122,0.15)', border: '1px solid rgba(10,140,122,0.3)' }}
                      aria-hidden="true"
                    >
                      <Icon size={24} className="text-[#0DB89E]" strokeWidth={1.75} />
                    </div>
                    <span
                      className="text-3xl font-bold leading-none"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'rgba(10,140,122,0.3)' }}
                      aria-hidden="true"
                    >
                      {step}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                  <p className="text-[#8A9BB0] text-sm leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
