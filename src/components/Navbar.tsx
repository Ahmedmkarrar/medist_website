import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MedistLogo from './MedistLogo';

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isHome    = location.pathname === '/';
  const navClass  = scrolled || !isHome ? 'glass-nav-light' : 'glass-nav';
  const logoVar   = scrolled || !isHome ? 'dark' : 'light';
  const linkClass = scrolled || !isHome
    ? 'text-[#0D1F3C] hover:text-[#0A8C7A]'
    : 'text-white/90 hover:text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navClass}`} role="banner">
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-[72px]"
        aria-label="Main navigation"
      >
        <Link to="/" aria-label="Medist — homepage" className="flex-shrink-0">
          <MedistLogo variant={logoVar} size="sm" />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link text-sm font-semibold tracking-wide transition-colors duration-200 ${linkClass} ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" className="btn-teal px-5 py-2.5 text-white text-sm font-semibold rounded-full">
            Request a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || !isHome ? 'text-[#0D1F3C]' : 'text-white'}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <ul className="flex flex-col py-5 px-6 gap-1 list-none" role="list">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex items-center py-3 text-sm font-semibold transition-colors ${
                      location.pathname === to ? 'text-[#0A8C7A]' : 'text-[#0D1F3C] hover:text-[#0A8C7A]'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  to="/contact"
                  className="block text-center py-3 btn-teal text-white text-sm font-semibold rounded-full"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
