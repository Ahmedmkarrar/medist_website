import { motion } from 'framer-motion';

const pillars = [
  {
    title: 'Secure Supply',
    items: [
      'Identify and qualify dependable supply sources',
      'Align product availability with market requirements',
      'Maintain continuity under shifting market conditions',
    ],
  },
  {
    title: 'Structure Trade',
    items: [
      'Coordinate documentation and trade flow',
      'Manage logistics across borders and jurisdictions',
      'Support compliant and efficient commercial execution',
    ],
  },
  {
    title: 'Protect Outcomes',
    items: [
      'Reduce operational uncertainty and delivery risk',
      'Support regulatory and quality requirements',
      'Preserve the integrity of every transaction',
    ],
  },
];

export default function WhyMedist() {
  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="value-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10"
        >
          <p className="section-label mb-3">What We Do</p>
          <h2 id="value-heading" className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-4 leading-snug">
            Execution Defines Reliability
          </h2>
          <p className="text-[#64748b] text-base leading-relaxed">
            In this industry, access is common. Execution is rare. Medist operates across the full
            trade cycle with the discipline required to reduce friction, shorten timelines, and protect
            the integrity of every transaction.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {pillars.map(({ title, items }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
              className="bg-white border border-[#e2e8f0] rounded-xl p-7 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
            >
              <h3 className="font-semibold text-[#0f1e35] text-base mb-5">{title}</h3>
              <ul className="flex flex-col gap-3 list-none">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748b] leading-relaxed">
                    <span className="text-[#1558a7] font-bold flex-shrink-0 mt-px">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
