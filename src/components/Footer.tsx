import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import MedistLogo from './MedistLogo';

const quickLinks = [
  { label: 'Home',                 to: '/' },
  { label: 'About Us',             to: '/about' },
  { label: 'Solutions & Services', to: '/solutions' },
  { label: 'Contact',              to: '/contact' },
];

const productLinks = [
  { label: 'Pharmaceuticals',      to: '/products?industry=pharma' },
  { label: 'Food & Beverage',      to: '/products?industry=beverages' },
  { label: 'Personal & Home Care', to: '/products?industry=personal' },
  { label: 'Laboratory Equipment', to: '/products?industry=lab' },
];

const certs = ['ISO 22000', 'cGMP', 'GMP', 'Halal', 'Kosher'];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0b1d35] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <MedistLogo variant="light" size="md" className="mb-4" />
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-5">
              Leading distributor of pharmaceutical ingredients, food additives, personal care
              raw materials, and laboratory equipment across the GCC &amp; MENA region.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Medist on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="text-white text-sm font-semibold mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-3 list-none">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-white/55 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Footer products links">
            <h3 className="text-white text-sm font-semibold mb-5">Products</h3>
            <ul className="flex flex-col gap-3 list-none">
              {productLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-white/55 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="text-white text-sm font-semibold mb-5">Contact Us</h3>
            <ul className="flex flex-col gap-3 list-none">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-white/40 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=25.2580424,55.3214658"
                  target="_blank" rel="noopener noreferrer"
                  className="text-white/55 hover:text-white text-sm transition-colors"
                >
                  4D Street, Riggat Al Buteen<br />Dubai, United Arab Emirates
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-white/40 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+971561117261" className="text-white/55 hover:text-white text-sm transition-colors">
                  +971 56 111 7261
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-[#25D366] flex-shrink-0" aria-hidden="true" />
                <a href="https://wa.me/971561117261" target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white text-sm transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-white/40 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@medist.ae" className="text-white/55 hover:text-white text-sm transition-colors">
                  info@medist.ae
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {certs.map((c, i) => (
              <span key={c} className="flex items-center gap-2">
                <span className="text-white/35 text-xs font-medium">{c}</span>
                {i < certs.length - 1 && <span className="text-white/15 text-xs">·</span>}
              </span>
            ))}
          </div>
          <p className="text-white/35 text-xs">
            &copy; {new Date().getFullYear()} Medist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
