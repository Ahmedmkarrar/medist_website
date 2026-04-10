import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MedistLogo from './MedistLogo';

const productLinks = [
  { label: 'Pharmaceuticals',           to: '/products?industry=pharma' },
  { label: 'Food & Beverage',           to: '/products?industry=beverages' },
  { label: 'Personal & Home Care',      to: '/products?industry=culinary' },
  { label: 'Laboratory Equipment',      to: '/products?industry=dairy' },
];

const navLinks = [
  { label: 'Solutions & Services', to: '/solutions' },
  { label: 'About Us',             to: '/about' },
  { label: 'Contact',              to: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropOpen(false); }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[64px]" aria-label="Main navigation">

        <Link to="/" aria-label="Medist homepage">
          <MedistLogo variant="dark" size="md" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 list-none" role="list">
          {/* Products dropdown */}
          <li ref={dropRef} className="relative">
            <button
              className="flex items-center gap-1 text-sm font-medium text-[#374151] hover:text-[#1d5fa8] transition-colors py-2"
              onClick={() => setDropOpen(v => !v)}
              aria-expanded={dropOpen}
              aria-haspopup="true"
            >
              Products
              <ChevronDown size={14} className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  className="nav-dropdown"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  {productLinks.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f8fafc] hover:text-[#1d5fa8] transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm font-medium transition-colors ${location.pathname === to ? 'text-[#1d5fa8]' : 'text-[#374151] hover:text-[#1d5fa8]'}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link to="/contact" className="btn-navy px-5 py-2.5 text-sm inline-block">
            Request a Sample
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[#374151]"
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <ul className="flex flex-col py-4 px-6 gap-1 list-none">
              <li className="py-2 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">Products</li>
              {productLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="block py-2 pl-3 text-sm text-[#374151] hover:text-[#1d5fa8]">{label}</Link>
                </li>
              ))}
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="block py-2.5 text-sm font-medium text-[#374151] hover:text-[#1d5fa8]">{label}</Link>
                </li>
              ))}
              <li className="pt-3">
                <Link to="/contact" className="btn-navy px-5 py-2.5 text-sm inline-block text-center w-full">
                  Request a Sample
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
