import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, FlaskConical, Wheat, Sparkles, Microscope } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MedistLogo from './MedistLogo';
import { industries } from '../data/industries';

// Icons keyed to industry id
const industryIcons: Record<string, React.ElementType> = {
  pharma: FlaskConical,
  food: Wheat,
  personal: Sparkles,
  lab: Microscope,
};

const solutionsLinks = [
  { label: 'Distribution & Cold Chain',          to: '/solutions' },
  { label: 'Application & Formulation Support',  to: '/solutions' },
  { label: 'Regulatory & Compliance',            to: '/solutions' },
  { label: 'Trade & Documentation',              to: '/solutions' },
];

const resourceLinks = [
  { label: 'Catalogues & Brochures',    to: '/resources' },
  { label: 'Application Notes',         to: '/resources' },
  { label: 'Case Studies',              to: '/resources' },
  { label: 'Regulatory Updates',        to: '/resources' },
];

const aboutLinks = [
  { label: 'Our Story & Mission',        to: '/about' },
  { label: 'Team & Expertise',           to: '/about' },
  { label: 'Certifications & Compliance',to: '/about' },
  { label: 'Geographic Coverage',        to: '/about' },
  { label: 'Careers',                    to: '/about' },
];

const contactLinks = [
  { label: 'Request a Quote (RFQ)',  to: '/contact?type=rfq' },
  { label: 'Request a Sample',       to: '/contact?type=sample' },
  { label: 'Request SDS / TDS',      to: '/contact?type=sds' },
  { label: 'Partner With Us',        to: '/contact?type=partner' },
];

type MenuKey = 'products' | 'solutions' | 'resources' | 'about' | 'contact' | null;

// Simple dropdown (non-mega)
function SimpleDropdown({ items }: { items: { label: string; to: string }[] }) {
  return (
    <div className="nav-dropdown">
      {items.map(({ label, to }) => (
        <Link
          key={label}
          to={to}
          className="block px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f8fafc] hover:text-[#1558a7] rounded-md transition-colors"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu]     = useState<MenuKey>(null);
  const [scrolled, setScrolled]     = useState(false);
  const headerRef  = useRef<HTMLElement>(null);
  const location   = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [location.pathname + location.search]);

  // Close on outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
      setOpenMenu(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  function toggle(key: MenuKey) {
    setOpenMenu(v => (v === key ? null : key));
  }

  const NavBtn = ({ menuKey, label }: { menuKey: MenuKey; label: string }) => (
    <button
      className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
        openMenu === menuKey ? 'text-[#1558a7]' : 'text-[#374151] hover:text-[#1558a7]'
      }`}
      onClick={() => toggle(menuKey)}
      aria-expanded={openMenu === menuKey}
      aria-haspopup="true"
    >
      {label}
      <ChevronDown
        size={13}
        className={`transition-transform duration-200 ${openMenu === menuKey ? 'rotate-180' : ''}`}
      />
    </button>
  );

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
      role="banner"
    >
      {/* ── Main nav bar ── */}
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[124px]"
        aria-label="Main navigation"
      >
        <Link to="/" aria-label="Medist homepage">
          <MedistLogo variant="dark" size="md" />
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-6 list-none" role="list">
          {/* Products */}
          <li className="relative">
            <NavBtn menuKey="products" label="Products" />
          </li>
          {/* Solutions */}
          <li className="relative">
            <NavBtn menuKey="solutions" label="Solutions & Services" />
            <AnimatePresence>
              {openMenu === 'solutions' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                >
                  <SimpleDropdown items={solutionsLinks} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {/* Resources */}
          <li className="relative">
            <NavBtn menuKey="resources" label="Resources" />
            <AnimatePresence>
              {openMenu === 'resources' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                >
                  <SimpleDropdown items={resourceLinks} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {/* About */}
          <li className="relative">
            <NavBtn menuKey="about" label="About Us" />
            <AnimatePresence>
              {openMenu === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                >
                  <SimpleDropdown items={aboutLinks} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {/* Contact */}
          <li className="relative">
            <NavBtn menuKey="contact" label="Contact" />
            <AnimatePresence>
              {openMenu === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                >
                  <SimpleDropdown items={contactLinks} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className="hidden lg:block">
          <Link to="/contact?type=sample" className="btn-navy px-5 py-2.5 text-sm inline-block">
            Request a Sample
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[#374151]"
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Products MEGA MENU (full-width, fixed below navbar) ── */}
      <AnimatePresence>
        {openMenu === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-[124px] left-0 right-0 bg-white border-b border-[#e2e8f0] shadow-xl z-50"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
              <div className="grid grid-cols-4 gap-8">
                {industries.map(ind => {
                  const Icon = industryIcons[ind.id] ?? FlaskConical;
                  return (
                    <div key={ind.id}>
                      {/* Industry header */}
                      <Link
                        to={`/products?industry=${ind.id}`}
                        className="flex items-center gap-2 mb-4 group"
                      >
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: ind.lightBg }}
                          aria-hidden="true"
                        >
                          <Icon size={14} style={{ color: ind.color }} />
                        </div>
                        <span
                          className="text-xs font-bold uppercase tracking-wider group-hover:underline"
                          style={{ color: ind.color }}
                        >
                          {ind.name}
                        </span>
                      </Link>

                      {/* Sub-categories */}
                      <ul className="flex flex-col gap-1 list-none mb-4">
                        {ind.subcategories.map(sub => (
                          <li key={sub.id}>
                            <Link
                              to={`/products?industry=${ind.id}&sub=${sub.id}`}
                              className="flex items-center gap-1.5 text-sm text-[#374151] hover:text-[#1558a7] py-1 transition-colors group"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#cbd5e1] flex-shrink-0 group-hover:bg-[#1558a7] transition-colors" aria-hidden="true" />
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* View all link */}
                      <Link
                        to={`/products?industry=${ind.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1558a7] hover:underline"
                      >
                        View all {ind.name}
                        <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden overflow-y-auto max-h-[80vh]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">

              {/* Products section */}
              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] py-2 mt-1">Products</p>
              {industries.map(ind => (
                <div key={ind.id}>
                  <Link
                    to={`/products?industry=${ind.id}`}
                    className="block py-2 text-sm font-semibold text-[#0f1e35] hover:text-[#1558a7]"
                  >
                    {ind.name}
                  </Link>
                  {ind.subcategories.map(sub => (
                    <Link
                      key={sub.id}
                      to={`/products?industry=${ind.id}&sub=${sub.id}`}
                      className="block py-1.5 pl-4 text-sm text-[#64748b] hover:text-[#1558a7]"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ))}

              {/* Other sections */}
              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] py-2 mt-3">Services</p>
              {solutionsLinks.map(({ label, to }) => (
                <Link key={label} to={to} className="block py-2 text-sm text-[#374151] hover:text-[#1558a7]">{label}</Link>
              ))}

              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] py-2 mt-2">Resources</p>
              {resourceLinks.map(({ label, to }) => (
                <Link key={label} to={to} className="block py-2 text-sm text-[#374151] hover:text-[#1558a7]">{label}</Link>
              ))}

              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] py-2 mt-2">About</p>
              {aboutLinks.map(({ label, to }) => (
                <Link key={label} to={to} className="block py-2 text-sm text-[#374151] hover:text-[#1558a7]">{label}</Link>
              ))}

              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] py-2 mt-2">Contact</p>
              {contactLinks.map(({ label, to }) => (
                <Link key={label} to={to} className="block py-2 text-sm text-[#374151] hover:text-[#1558a7]">{label}</Link>
              ))}

              <div className="pt-4 pb-2">
                <Link to="/contact?type=sample" className="btn-navy px-5 py-2.5 text-sm inline-block w-full text-center">
                  Request a Sample
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
