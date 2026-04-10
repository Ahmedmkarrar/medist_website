import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { industries } from '../data/industries';
import HeroSection from '../components/HeroSection';
import CtaBanner from '../components/CtaBanner';

interface ProductCard { name: string; industryId: string; industryName: string; }

const allProducts: ProductCard[] = industries.flatMap(ind =>
  ind.products.map(p => ({ name: p, industryId: ind.id, industryName: ind.name }))
);

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const activeIndustry = searchParams.get('industry') ?? 'all';

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const filtered = useMemo(() => {
    let r = allProducts;
    if (activeIndustry !== 'all') r = r.filter(p => p.industryId === activeIndustry);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q) || p.industryName.toLowerCase().includes(q));
    }
    return r;
  }, [activeIndustry, search]);

  function setIndustry(id: string) {
    if (id === 'all') { searchParams.delete('industry'); setSearchParams(searchParams); }
    else setSearchParams({ industry: id });
  }

  return (
    <main id="main-content">
      <HeroSection
        title="Our Product Catalogue"
        subtitle="500+ premium raw ingredients and materials sourced from certified global suppliers across 7 industry verticals."
        primaryCta={{ label: 'Request a Sample', to: '/contact' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-[#e2e8f0] rounded-lg bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d5fa8]/20 focus:border-[#1d5fa8] transition"
            aria-label="Search products"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#374151]" aria-label="Clear">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-52 flex-shrink-0" aria-label="Filter by industry">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-3">Industry</p>
            <ul className="flex flex-row flex-wrap lg:flex-col gap-2 list-none">
              <li>
                <button
                  onClick={() => setIndustry('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeIndustry === 'all' ? 'bg-[#1d5fa8] text-white' : 'bg-white border border-[#e2e8f0] text-[#374151] hover:border-[#1d5fa8]/40'}`}
                  aria-pressed={activeIndustry === 'all'}
                >
                  All Industries
                </button>
              </li>
              {industries.map(ind => (
                <li key={ind.id}>
                  <button
                    onClick={() => setIndustry(ind.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeIndustry === ind.id ? 'bg-[#1d5fa8] text-white' : 'bg-white border border-[#e2e8f0] text-[#374151] hover:border-[#1d5fa8]/40'}`}
                    aria-pressed={activeIndustry === ind.id}
                  >
                    {ind.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-sm text-[#64748b] mb-5">
              Showing <strong className="text-[#1e293b]">{filtered.length}</strong> products
            </p>
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeIndustry + search}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 list-none"
              >
                {filtered.map((product, i) => (
                  <motion.li
                    key={product.name + product.industryId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.025, 0.25) }}
                  >
                    <article className="bg-white border border-[#e2e8f0] rounded-lg p-4 hover:border-[#1d5fa8]/30 hover:shadow-sm transition-all h-full">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3"
                        style={{ background: '#eff6ff', color: '#1d5fa8' }}
                      >
                        {product.industryName}
                      </span>
                      <p className="text-sm font-medium text-[#1e293b] leading-snug">{product.name}</p>
                    </article>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#64748b]">No products match your search.</p>
                <button onClick={() => { setSearch(''); setIndustry('all'); }}
                  className="mt-3 text-sm text-[#1d5fa8] font-semibold hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CtaBanner />
    </main>
  );
}
