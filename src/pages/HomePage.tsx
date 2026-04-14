import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import IndustriesSection from '../components/IndustriesSection';
import WhyMedist from '../components/WhyMedist';
import CtaBanner from '../components/CtaBanner';

const bothSides = [
  {
    title: 'For Manufacturers',
    body: 'Structured access to regional markets — positioning products, securing demand, and managing the realities of cross-border trade with precision and accountability.',
  },
  {
    title: 'For Buyers',
    body: 'Consistent access to high-quality materials — supported by verified sourcing, complete documentation, and reliable delivery across critical supply environments.',
  },
];

const whyBring = [
  'More than 20 years of operational presence',
  'Established sourcing networks across key manufacturing regions',
  'Deep familiarity with regulated and compliance-driven industries',
  'Strong execution across sourcing, logistics, and delivery',
];

const whyOperate = [
  'With structure rather than improvisation',
  'With accountability rather than noise',
  'With long-term reliability rather than short-term transactions',
  'With a clear focus on continuity, accuracy, and control',
];

export default function HomePage() {
  return (
    <main id="main-content">

      {/* ── Hero ── */}
      <HeroSection
        eyebrow="Operating Since 2006"
        title="We Move Supply Where It Matters"
        subtitle="Medist acts as a strategic link between manufacturers and markets — securing demand, structuring trade, and ensuring the compliant, reliable flow of pharmaceutical, food, and personal care materials."
        subtitleExtra="Enabling manufacturers to expand into new markets while ensuring buyers maintain consistent, dependable supply."
        primaryCta={{ label: 'Request a Quote', to: '/contact' }}
        secondaryCta={{ label: 'Explore Capabilities', to: '/products' }}
        card={{
          heading: 'Built for critical supply chains',
          items: [
            'Pharmaceutical materials and market execution',
            'Food and beverage ingredients with structured delivery',
            'Personal and home care raw materials',
            'Laboratory equipment supporting quality and development',
          ],
        }}
      />

      {/* ── A System Built for Movement ── */}
      <section className="bg-white py-14 lg:py-18 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="section-label mb-3">How We Work</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-5 leading-snug">
              A System Built for Movement
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed">
              For more than 20 years, Medist has operated within complex and regulated supply chains
              where precision is critical and disruption is costly. Our role is not limited to sourcing or
              distribution. We structure the movement of materials — aligning supply with demand,
              coordinating across borders, and ensuring that every transaction meets both regulatory and
              operational standards. In environments defined by uncertainty, we act as a point of control.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Core Capabilities ── */}
      <IndustriesSection />

      {/* ── Execution Defines Reliability ── */}
      <WhyMedist />

      {/* ── Built for Both Sides ── */}
      <section className="bg-[#f6f8fa] border-y border-[#e2e8f0] py-16 lg:py-20" aria-labelledby="both-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-2xl mb-10"
          >
            <p className="section-label mb-3">Who We Serve</p>
            <h2 id="both-heading" className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-4 leading-snug">
              Built for Both Sides of the Market
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed">
              Medist creates value by operating as a disciplined commercial bridge — supporting
              manufacturers seeking market access and buyers requiring dependable supply.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {bothSides.map(({ title, body }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white border border-[#e2e8f0] rounded-xl p-7 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
              >
                <h3 className="font-semibold text-[#0f1e35] text-base mb-3">{title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Medist ── */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-2xl mb-10"
          >
            <p className="section-label mb-3">Our Advantage</p>
            <h2 id="why-heading" className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-4 leading-snug">
              Why Medist
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed">
              What defines Medist is not visibility. It is operational consistency. Our position has been
              built through long-term execution in sectors where quality, compliance, and reliability are
              non-negotiable.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* What We Bring */}
            <motion.article
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-white border border-[#e2e8f0] rounded-xl p-7 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
            >
              <h3 className="font-semibold text-[#0f1e35] text-base mb-5">What We Bring</h3>
              <ul className="flex flex-col gap-3 list-none">
                {whyBring.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748b] leading-relaxed">
                    <span className="text-[#1558a7] font-bold flex-shrink-0 mt-px">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* How We Operate */}
            <motion.article
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-white border border-[#e2e8f0] rounded-xl p-7 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
            >
              <h3 className="font-semibold text-[#0f1e35] text-base mb-5">How We Operate</h3>
              <ul className="flex flex-col gap-3 list-none">
                {whyOperate.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748b] leading-relaxed">
                    <span className="text-[#1558a7] font-bold flex-shrink-0 mt-px">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>

          {/* CTA link */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <Link to="/about" className="text-[#1558a7] text-sm font-semibold hover:underline">
              Learn more about Medist →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Quote + CTA ── */}
      <CtaBanner
        quote="In our field, reputation is not built through claims. It is built through repeated delivery under pressure."
        quoteHighlight="Medist maintains a clear standard: every commitment is supported by structure, and every structure is executed with precision."
        ctaTitle="Structured Trade. Reliable Outcomes."
        ctaBody="Whether you are expanding into new markets or securing critical supply, Medist operates to ensure continuity, compliance, and control at every stage."
        primaryCta={{ label: 'Request a Quote', to: '/contact' }}
        secondaryCta={{ label: 'Contact Medist', to: '/contact' }}
      />

    </main>
  );
}
