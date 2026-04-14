import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CtaBanner from '../components/CtaBanner';

const storyCards = [
  {
    title: 'Mission',
    body: 'To strengthen supply continuity between manufacturers and markets through disciplined execution, accountable trade practices, and long-term commercial reliability.',
  },
  {
    title: 'Vision',
    body: 'To remain a trusted link in critical supply networks by aligning quality, logistics, documentation, and market needs into one coherent system.',
  },
];

const teamCards = [
  {
    title: 'Commercial Judgment',
    body: 'Experience across regulated and performance-sensitive sectors supports decisions that balance supply reality, customer needs, documentation requirements, and market timing.',
  },
  {
    title: 'Operational Coordination',
    body: 'The company works across sourcing, trade flow, documentation, and logistics with the coordination required to make transactions dependable rather than improvised.',
  },
  {
    title: 'Sector Range',
    body: 'Expertise spans pharmaceuticals, food and beverage ingredients, personal and home care raw materials, laboratory-related supply, and documentation-heavy cross-border trade execution.',
  },
];

const certCards = [
  {
    title: 'Documentation Readiness',
    body: 'Reliability begins with clear, accurate, and accessible documentation that supports movement, evaluation, and commercial confidence.',
  },
  {
    title: 'Supplier Alignment',
    body: 'Transactions are approached with attention to source quality, product fit, and market expectations before execution begins.',
  },
  {
    title: 'Traceability Mindset',
    body: 'Traceability and process clarity are treated as operating requirements, especially in sectors where consistency and accountability matter.',
  },
  {
    title: 'Structured Evaluation',
    body: 'Supplier and transaction review are approached systematically to reduce risk and protect the integrity of each movement.',
  },
];

const regions = ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Egypt', 'Jordan'];

const coverageCards = [
  {
    title: 'Reach',
    items: [
      'Access to major manufacturing regions',
      'Support for regional market supply and distribution',
      'Familiarity with cross-border trade requirements',
    ],
  },
  {
    title: 'Function',
    items: [
      'Support manufacturers seeking market expansion',
      'Support buyers seeking dependable continuity',
      'Operate across complex commercial environments with control',
    ],
  },
];

const careerAreas = [
  'Sales and business development',
  'Sourcing and supplier coordination',
  'Operations and logistics',
  'Documentation and trade support',
  'Market development and commercial execution',
];

export default function AboutPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <main id="main-content">

      {/* ── Hero ── */}
      <HeroSection
        eyebrow="About Us"
        title="Built Through Trade. Proven Through Time."
        subtitle="Founded in 2006, Medist has spent more than 20 years operating across supply environments where reliability, compliance, and execution are not optional. The role has remained clear: connect manufacturers to markets, move critical materials with discipline."
        primaryCta={{ label: 'Explore Our Story', to: '#story' }}
        secondaryCta={{ label: 'Careers', to: '#careers' }}
        card={{
          heading: 'What defines the company',
          items: [
            'A reliable link between manufacturers and markets',
            'Structured around disciplined trade and execution',
            'Active in sectors where timing, quality, and compliance matter',
            'Strengthened by more than 20 years of consistent market activity',
          ],
        }}
      />

      {/* ── Our Story & Mission ── */}
      <section id="story" className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10"
          >
            <p className="section-label mb-3">Background</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-5 leading-snug">
              Our Story &amp; Mission
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed mb-4">
              Established in 2006, the company was built to serve as a dependable commercial link between
              global manufacturers and regional demand. Over time, that role expanded across
              pharmaceuticals, food and beverage ingredients, personal and home care, and
              laboratory-related supply — always with the same operating principle: trade must be
              structured properly to remain reliable.
            </p>
            <p className="text-[#64748b] text-base leading-relaxed">
              Growth did not come from noise or overstatement. It came from sustained execution, careful
              coordination, and the ability to operate in markets where documentation, timing, and supply
              continuity matter. In sectors shaped by regulation, technical requirements, and commercial
              pressure, dependable movement is not created by access alone. It is created by structure.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {storyCards.map(({ title, body }, i) => (
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

      {/* ── Team & Expertise ── */}
      <section id="team" className="bg-[#f6f8fa] border-y border-[#e2e8f0] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10"
          >
            <p className="section-label mb-3">People</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-5 leading-snug">
              Team &amp; Expertise
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed">
              Behind every successful transaction is a chain of correct decisions. That is where real
              expertise shows. Strength lies in the ability to align sourcing, documentation, logistics,
              and market requirements across multiple sectors. This requires more than product
              familiarity — it requires judgment, commercial awareness, technical understanding, and the
              discipline to execute under pressure.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {teamCards.map(({ title, body }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}
                className="bg-white border border-[#e2e8f0] rounded-xl p-7 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
              >
                <h3 className="font-semibold text-[#0f1e35] text-base mb-3">{title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications & Compliance ── */}
      <section id="compliance" className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10"
          >
            <p className="section-label mb-3">Standards</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-5 leading-snug">
              Certifications &amp; Compliance
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed">
              In this field, credibility is shaped by standards, documentation, and process discipline.
              Operations are approached with a strong emphasis on compliance readiness, traceability,
              supplier alignment, and documentation integrity — especially in sectors where quality
              requirements, regulatory expectations, and commercial consequences are closely connected.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {certCards.map(({ title, body }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
              >
                <h3 className="font-semibold text-[#0f1e35] text-sm mb-3">{title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{body}</p>
              </motion.article>
            ))}
          </div>

          {/* Note panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-xl p-6"
          >
            <p className="text-sm font-semibold text-[#0f1e35] mb-1">Note</p>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Specific certifications, approvals, and product-related documentation can be shared based
              on product category, origin, and destination market requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Geographic Coverage ── */}
      <section id="coverage" className="bg-[#f6f8fa] border-y border-[#e2e8f0] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10"
          >
            <p className="section-label mb-3">Where We Operate</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-5 leading-snug">
              Geographic Coverage
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed">
              The business operates across international supply networks that connect manufacturing
              strength with regional demand. Its value is not defined only by where products move, but by
              how effectively those points are connected — through coordination, documentation,
              responsiveness, and trade discipline.
            </p>
          </motion.div>

          {/* Region pills */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {regions.map(r => (
              <span
                key={r}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#e2e8f0] rounded-full text-sm text-[#374151] font-medium"
              >
                <MapPin size={12} className="text-[#1558a7]" aria-hidden="true" />
                {r}
              </span>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {coverageCards.map(({ title, items }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
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

      {/* ── Careers ── */}
      <section id="careers" className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10"
          >
            <p className="section-label mb-3">Join Us</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-5 leading-snug">
              Careers
            </h2>
            <p className="text-[#64748b] text-base leading-relaxed">
              Strong businesses are built by people who combine professionalism with judgment. The work
              involves more than transactions — it involves responsibility, timing, clarity, and execution
              across sectors where details matter. Discipline, consistency, and accountability are
              essential qualities, not optional ones.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            <motion.article
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-white border border-[#e2e8f0] rounded-xl p-7 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
            >
              <h3 className="font-semibold text-[#0f1e35] text-base mb-5">Areas of Opportunity</h3>
              <ul className="flex flex-col gap-3 list-none">
                {careerAreas.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748b] leading-relaxed">
                    <span className="text-[#1558a7] font-bold flex-shrink-0 mt-px">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-white border border-[#e2e8f0] rounded-xl p-7 shadow-[0_8px_24px_rgba(16,32,42,0.06)] card-hover"
            >
              <h3 className="font-semibold text-[#0f1e35] text-base mb-3">Working Environment</h3>
              <p className="text-sm text-[#64748b] leading-relaxed mb-6">
                Those interested in meaningful work inside a company shaped by real operational
                substance, disciplined trade practices, and execution-focused thinking are encouraged to
                connect. We're building for the long term — and we look for people who think the same way.
              </p>
              <a
                href="/contact?type=partner"
                className="btn-navy px-6 py-3 text-sm inline-flex"
              >
                Get in Touch
              </a>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ── Quote + CTA ── */}
      <CtaBanner
        quote="More than 20 years of activity have shaped a clear identity: practical, disciplined, and built around reliable execution."
        quoteHighlight="The objective has never been to add noise to the supply chain. It has been to make it work — properly, consistently, and at the standard serious industries require."
        ctaTitle="Built for Long-Term Commercial Trust"
        ctaBody="Whether the priority is supply continuity, market development, documentation confidence, or dependable execution, the company is structured to support demanding sectors with clarity and control."
        primaryCta={{ label: 'Contact Medist', to: '/contact' }}
        secondaryCta={{ label: 'Explore Careers', to: '/about#careers' }}
      />

    </main>
  );
}
