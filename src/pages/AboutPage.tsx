import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, ShieldCheck } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CtaBanner from '../components/CtaBanner';
import CertificationsSection from '../components/CertificationsSection';

const regions = ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Egypt', 'Jordan'];

const certs = [
  { icon: ShieldCheck, label: 'ISO 22000' },
  { icon: ShieldCheck, label: 'cGMP' },
  { icon: ShieldCheck, label: 'GMP' },
  { icon: ShieldCheck, label: 'Halal' },
  { icon: ShieldCheck, label: 'Kosher' },
];

const team = [
  { icon: Users,  title: 'Commercial Team',    body: 'Experienced sales specialists with deep knowledge of pharmaceutical and food ingredient markets across MENA.' },
  { icon: Award,  title: 'Technical Experts',  body: 'Application scientists and R&D advisors who help clients solve formulation challenges and meet regulatory targets.' },
  { icon: Globe,  title: 'Regulatory Affairs', body: 'In-house regulatory team supporting product registration, dossier preparation, and market access across GCC countries.' },
];

export default function AboutPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <main id="main-content">
      <HeroSection
        title="About Medist"
        subtitle="A leading distributor of pharmaceutical ingredients, food additives, personal care raw materials, and laboratory equipment serving the GCC & MENA region."
        primaryCta={{ label: 'Contact Us', to: '/contact' }}
      />

      {/* Story & Mission */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] mb-5">Our Story & Mission</h2>
              <div className="flex flex-col gap-4 text-sm text-[#374151] leading-relaxed">
                <p>
                  Medist was established with a clear mission: to bridge the gap between world-class ingredient
                  manufacturers and the growing pharmaceutical, food, and personal care industries across the Middle East.
                </p>
                <p>
                  Over two decades, we have built an extensive network of certified suppliers across Europe, Asia,
                  and the Americas — enabling us to offer clients a single, reliable source for all their ingredient and
                  raw material requirements.
                </p>
                <p>
                  We don't simply distribute. We partner. Our team of application scientists, regulatory specialists,
                  and logistics experts work alongside your team to ensure every ingredient we supply performs exactly
                  as required — from R&D through to full-scale production.
                </p>
              </div>
            </motion.div>

            {/* Team & Expertise + Certs */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-[#0f1e35] mb-5">Team & Expertise</h2>
                <div className="flex flex-col gap-4">
                  {team.map(({ icon: Icon, title, body }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#eff6ff] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Icon size={16} className="text-[#1d5fa8]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0f1e35] mb-0.5">{title}</p>
                        <p className="text-sm text-[#64748b] leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
                className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-6"
              >
                <h3 className="text-base font-semibold text-[#0f1e35] mb-4">Certifications &amp; Compliance</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {certs.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 text-center">
                      <div className="w-11 h-11 rounded-full border-2 border-[#1d5fa8] flex items-center justify-center">
                        <Icon size={14} className="text-[#1d5fa8]" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-semibold text-[#374151]">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Coverage */}
      <section className="bg-[#f8fafc] border-y border-[#e2e8f0] py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-[#0f1e35] mb-3"
          >
            Geographic Coverage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#64748b] text-sm mb-8 max-w-xl mx-auto"
          >
            Serving manufacturers and distributors across the GCC and wider MENA region with
            competitive lead times and local regulatory expertise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {regions.map(r => (
              <span key={r} className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-[#374151]">
                {r}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Overview embed placeholder */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-[#0f1e35] mb-6"
          >
            Company Overview
          </motion.h2>
          {/* Video / embed placeholder */}
          <div className="mx-auto max-w-2xl bg-[#f8fafc] border border-[#e2e8f0] rounded-xl flex items-center justify-center h-56">
            <p className="text-sm text-[#94a3b8]">Company video coming soon</p>
          </div>
        </div>
      </section>

      <CertificationsSection />
      <CtaBanner />
    </main>
  );
}
