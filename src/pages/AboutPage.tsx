import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const timeline = [
  { year: '2004', title: 'Founded',           body: 'Medist established in Dubai with a mission to bridge premium global ingredient suppliers with the Middle East\'s growing food & pharma sector.' },
  { year: '2008', title: 'Regional Growth',   body: 'Expanded operations across GCC markets, building dedicated sales and logistics capabilities in Saudi Arabia, Qatar, and Kuwait.' },
  { year: '2014', title: 'Portfolio Scaling', body: 'Launched dedicated verticals for Dairy, Meat, and Snack ingredients — growing the product portfolio to over 300 SKUs.' },
  { year: '2019', title: 'Africa Expansion',  body: 'Extended distribution network into North and Sub-Saharan Africa, serving clients across Egypt, Morocco, Kenya, and Nigeria.' },
  { year: '2024', title: '500+ Products',     body: 'Today Medist sources over 500 products from 50+ certified global suppliers, serving clients in 30+ countries across the MENA region and beyond.' },
];

const values = [
  { icon: ShieldCheck, title: 'Integrity',    body: 'We represent only what we can stand behind. Every supplier is vetted. Every claim is backed by documentation.' },
  { icon: Globe,       title: 'Partnership',  body: 'We grow when our clients grow. We invest in understanding your product, your market, and your long-term goals.' },
  { icon: Users,       title: 'Expertise',    body: '20+ years of formulation knowledge, supplier relationships, and regional regulatory understanding — at your service.' },
];

const team = [
  { name: 'CEO & Founder',       role: 'Leadership',              initials: 'MD' },
  { name: 'Head of Sourcing',    role: 'Global Supply Chain',     initials: 'SC' },
  { name: 'Technical Director',  role: 'R&D & Quality Assurance', initials: 'TD' },
  { name: 'Sales Director',      role: 'MENA & Africa',           initials: 'SD' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

export default function AboutPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <main id="main-content">
      {/* ── HERO ── */}
      <section className="hero-gradient relative overflow-hidden pt-36 pb-24">
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle at 70% 30%, #0A8C7A, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.p variants={fadeUp}
              className="text-[#0DB89E] text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Our Story
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              20 Years of{' '}
              <span className="gradient-text-teal">Ingredient</span>{' '}
              Excellence
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#8A9BB0] text-lg leading-relaxed max-w-xl">
              Since 2004, Medist has been connecting the Middle East's finest food and
              pharmaceutical manufacturers with world-class ingredient suppliers. We're not
              just a distributor — we're a formulation partner.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="btn-teal inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-full text-sm">
                Work With Us
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { v: '20+',  l: 'Years Experience' },
              { v: '500+', l: 'Products Sourced' },
              { v: '50+',  l: 'Global Suppliers' },
              { v: '30+',  l: 'Countries Served' },
            ].map(({ v, l }) => (
              <div
                key={l}
                className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-4xl font-bold text-[#0DB89E] mb-1">{v}</p>
                <p className="text-sm text-[#8A9BB0]">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#0A8C7A] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          >
            Our Mission
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-3xl lg:text-4xl font-bold text-[#0D1F3C] leading-snug mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            "To be the most trusted source of premium ingredients for manufacturers
            who refuse to compromise on quality."
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#8A9BB0] text-base leading-relaxed max-w-2xl mx-auto"
          >
            Every supplier we work with is rigorously vetted. Every ingredient we source
            comes with full certification documentation. We don't cut corners — because
            our clients can't afford to either.
          </motion.p>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-[#F7F9FC] py-20 lg:py-24" aria-labelledby="timeline-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#0A8C7A] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            >
              Our Journey
            </motion.p>
            <motion.h2
              id="timeline-heading"
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Two Decades of Growth
            </motion.h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-px"
              style={{ background: 'linear-gradient(to bottom, #0A8C7A, rgba(10,140,122,0.1))' }}
              aria-hidden="true"
            />

            <ol className="flex flex-col gap-10 list-none">
              {timeline.map((item, i) => (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`relative flex md:grid md:grid-cols-2 gap-6 pl-12 md:pl-0 ${
                    i % 2 === 0 ? 'md:text-right' : ''
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full border-2 border-[#0A8C7A] bg-[#F7F9FC] z-10"
                    aria-hidden="true"
                  />

                  {/* Content — swap sides on even */}
                  {i % 2 === 0 ? (
                    <>
                      <div className="md:block">
                        <span className="text-3xl font-bold text-[#0A8C7A]"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {item.year}
                        </span>
                        <h3 className="text-[#0D1F3C] font-bold text-base mt-0.5">{item.title}</h3>
                        <p className="text-[#8A9BB0] text-sm leading-relaxed mt-1">{item.body}</p>
                      </div>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <div>
                        <span className="text-3xl font-bold text-[#0A8C7A]"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {item.year}
                        </span>
                        <h3 className="text-[#0D1F3C] font-bold text-base mt-0.5">{item.title}</h3>
                        <p className="text-[#8A9BB0] text-sm leading-relaxed mt-1">{item.body}</p>
                      </div>
                    </>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-white py-20 lg:py-24" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <motion.h2
              id="values-heading"
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What We Stand For
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0A8C7A]/10 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
                  <Icon size={26} className="text-[#0A8C7A]" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-[#0D1F3C] mb-3">{title}</h3>
                <p className="text-[#8A9BB0] text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-[#F7F9FC] py-20 lg:py-24" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#0A8C7A] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            >
              The Team
            </motion.p>
            <motion.h2
              id="team-heading"
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ingredient Specialists, Ready to Help
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #0A8C7A, #076E5F)' }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <p className="font-bold text-[#0D1F3C] text-sm mb-1">{name}</p>
                <p className="text-[#8A9BB0] text-xs">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#071228] diagonal-stripe py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to Partner with Medist?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#8A9BB0] text-base mb-8 max-w-xl mx-auto"
          >
            Whether you're sourcing a single ingredient or building a full formulation stack,
            we're here to help.
          </motion.p>
          <Link to="/contact" className="btn-teal inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
