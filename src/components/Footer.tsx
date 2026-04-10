import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { industries } from '../data/industries';
import MedistLogo from './MedistLogo';

const quickLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#040D1A] text-white" role="contentinfo">
      {/* Top accent line */}
      <div className="h-[3px]" style={{ background: 'linear-gradient(to right, #0A8C7A, #C9A84C, #0A8C7A)' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div>
            <MedistLogo variant="light" size="sm" className="mb-5" />
            <p className="text-[#8A9BB0] text-sm leading-relaxed mb-6 max-w-xs">
              Premium raw ingredient sourcing for the Pharmaceutical, Food &amp; Beverage, and
              Personal Care industries across the Middle East and beyond.
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0A8C7A')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                aria-label="Medist on LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/971000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#25D366')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                aria-label="Medist on WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0DB89E] mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 list-none" role="list">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[#8A9BB0] hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#0A8C7A] transition-all duration-200" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Industries */}
          <nav aria-label="Footer industries links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0DB89E] mb-6">
              Industries
            </h3>
            <ul className="flex flex-col gap-3 list-none" role="list">
              {industries.map((ind) => (
                <li key={ind.id}>
                  <Link
                    to={`/products?industry=${ind.id}`}
                    className="text-[#8A9BB0] hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] transition-all duration-200" style={{ background: ind.color }} aria-hidden="true" />
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 — Contact */}
          <address className="not-italic">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0DB89E] mb-6">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 list-none" role="list">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#0A8C7A] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-[#8A9BB0] text-sm leading-relaxed">Medist HQ, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#0A8C7A] flex-shrink-0" aria-hidden="true" />
                <a href="tel:+971000000000" className="text-[#8A9BB0] hover:text-white text-sm transition-colors">
                  +971 00 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#0A8C7A] flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@medist.com" className="text-[#8A9BB0] hover:text-white text-sm transition-colors">
                  info@medist.com
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-[#8A9BB0] text-xs">
            &copy; {new Date().getFullYear()} Medist. All rights reserved.
          </p>
          <p className="text-[#8A9BB0] text-xs">
            Halal &bull; Kosher &bull; ISO 22000 &bull; BRC &bull; FSSC 22000
          </p>
        </div>
      </div>
    </footer>
  );
}
