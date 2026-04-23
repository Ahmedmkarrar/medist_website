import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { industries, foodUseCases, foodProductUseCases } from '../data/industries';
import HeroSection from '../components/HeroSection';
import CtaBanner from '../components/CtaBanner';

interface ProductCard { name: string; industryId: string; industryName: string; subId: string; subName: string; }

const allProducts: ProductCard[] = industries.flatMap(ind =>
  ind.subcategories.flatMap(sub =>
    sub.products.map(p => ({
      name: p,
      industryId: ind.id,
      industryName: ind.name,
      subId: sub.id,
      subName: sub.name,
    }))
  )
);

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const activeIndustry = searchParams.get('industry') ?? 'all';
  const activeSub      = searchParams.get('sub') ?? 'all';
  const activeUseCase  = searchParams.get('usecase') ?? 'all';

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const activeIndustryData = industries.find(i => i.id === activeIndustry);
  const isFoodSelected = activeIndustry === 'food';

  const filtered = useMemo(() => {
    let r = allProducts;
    if (activeIndustry !== 'all') r = r.filter(p => p.industryId === activeIndustry);
    if (activeSub      !== 'all') r = r.filter(p => p.subId      === activeSub);
    if (isFoodSelected && activeUseCase !== 'all') {
      r = r.filter(p => (foodProductUseCases[p.name] ?? []).includes(activeUseCase));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.industryName.toLowerCase().includes(q) ||
        p.subName.toLowerCase().includes(q)
      );
    }
    return r;
  }, [activeIndustry, activeSub, activeUseCase, search, isFoodSelected]);

  function setIndustry(id: string) {
    const next = new URLSearchParams();
    if (id !== 'all') next.set('industry', id);
    setSearchParams(next);
  }

  function setSub(id: string) {
    const next = new URLSearchParams();
    if (activeIndustry !== 'all') next.set('industry', activeIndustry);
    if (id !== 'all') next.set('sub', id);
    setSearchParams(next);
  }

  function setUseCase(id: string) {
    const next = new URLSearchParams();
    if (activeIndustry !== 'all') next.set('industry', activeIndustry);
    if (activeSub !== 'all') next.set('sub', activeSub);
    if (id !== 'all') next.set('usecase', id);
    setSearchParams(next);
  }

  return (
    <main id="main-content">
      <HeroSection
        title="Our Product Catalogue"
        subtitle="500+ premium raw ingredients and materials sourced from certified global suppliers across pharmaceuticals, food, personal care, and laboratory sectors."
        primaryCta={{ label: 'Request a Sample', to: '/contact?type=sample' }}
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
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-[#e2e8f0] rounded-lg bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1558a7]/20 focus:border-[#1558a7] transition"
            aria-label="Search products"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#374151]"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0" aria-label="Filter by industry">
            <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Industry</p>
            <ul className="flex flex-row flex-wrap lg:flex-col gap-2 list-none mb-6">
              <li>
                <button
                  onClick={() => setIndustry('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeIndustry === 'all'
                      ? 'bg-[#1558a7] text-white'
                      : 'bg-white border border-[#e2e8f0] text-[#374151] hover:border-[#1558a7]/40'
                  }`}
                  aria-pressed={activeIndustry === 'all'}
                >
                  All Industries
                </button>
              </li>
              {industries.map(ind => (
                <li key={ind.id}>
                  <button
                    onClick={() => setIndustry(ind.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeIndustry === ind.id
                        ? 'bg-[#1558a7] text-white'
                        : 'bg-white border border-[#e2e8f0] text-[#374151] hover:border-[#1558a7]/40'
                    }`}
                    aria-pressed={activeIndustry === ind.id}
                  >
                    {ind.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sub-category filter — shown when an industry is selected */}
            {activeIndustryData && (
              <div className="hidden lg:block">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Category</p>
                <ul className="flex flex-col gap-1.5 list-none">
                  <li>
                    <button
                      onClick={() => setSub('all')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                        activeSub === 'all'
                          ? 'font-semibold text-[#1558a7] bg-[#eff6ff]'
                          : 'text-[#374151] hover:text-[#1558a7]'
                      }`}
                      aria-pressed={activeSub === 'all'}
                    >
                      All Categories
                    </button>
                  </li>
                  {activeIndustryData.subcategories.map(sub => (
                    <li key={sub.id}>
                      <button
                        onClick={() => setSub(sub.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                          activeSub === sub.id
                            ? 'font-semibold text-[#1558a7] bg-[#eff6ff]'
                            : 'text-[#374151] hover:text-[#1558a7]'
                        }`}
                        aria-pressed={activeSub === sub.id}
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Use Case filter — Food & Beverage only */}
                {isFoodSelected && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Use Case</p>
                    <ul className="flex flex-col gap-1.5 list-none">
                      <li>
                        <button
                          onClick={() => setUseCase('all')}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                            activeUseCase === 'all'
                              ? 'font-semibold text-[#0e9f6e] bg-[#ecfdf5]'
                              : 'text-[#374151] hover:text-[#0e9f6e]'
                          }`}
                          aria-pressed={activeUseCase === 'all'}
                        >
                          All Use Cases
                        </button>
                      </li>
                      {foodUseCases.map(uc => (
                        <li key={uc.id}>
                          <button
                            onClick={() => setUseCase(uc.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                              activeUseCase === uc.id
                                ? 'font-semibold text-[#0e9f6e] bg-[#ecfdf5]'
                                : 'text-[#374151] hover:text-[#0e9f6e]'
                            }`}
                            aria-pressed={activeUseCase === uc.id}
                          >
                            {uc.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Active filter chips */}
            {(activeIndustry !== 'all' || activeSub !== 'all' || activeUseCase !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {activeIndustry !== 'all' && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      backgroundColor: activeIndustryData?.lightBg,
                      color: activeIndustryData?.color,
                      borderColor: activeIndustryData?.color + '40',
                    }}
                  >
                    {activeIndustryData?.name}
                    <button
                      onClick={() => setIndustry('all')}
                      className="ml-0.5 hover:opacity-70"
                      aria-label="Remove industry filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}
                {activeSub !== 'all' && activeIndustryData && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f1f5f9] text-[#374151] border border-[#e2e8f0]">
                    {activeIndustryData.subcategories.find(s => s.id === activeSub)?.name}
                    <button
                      onClick={() => setSub('all')}
                      className="ml-0.5 hover:opacity-70"
                      aria-label="Remove category filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}
                {activeUseCase !== 'all' && isFoodSelected && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ecfdf5] text-[#0e9f6e] border border-[#0e9f6e]/30">
                    {foodUseCases.find(u => u.id === activeUseCase)?.name}
                    <button
                      onClick={() => setUseCase('all')}
                      className="ml-0.5 hover:opacity-70"
                      aria-label="Remove use case filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}
              </div>
            )}

            <p className="text-sm text-[#64748b] mb-5">
              Showing <strong className="text-[#1e293b]">{filtered.length}</strong> products
            </p>

            <AnimatePresence mode="wait">
              <motion.ul
                key={activeIndustry + activeSub + search}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 list-none"
              >
                {filtered.map((product, i) => {
                  return (
                    <motion.li
                      key={product.name + product.subId}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.2) }}
                    >
                      <article className="bg-white border border-[#e2e8f0] rounded-lg p-4 hover:border-[#1558a7]/30 hover:shadow-sm transition-all h-full flex items-center">
                        <p className="text-sm font-medium text-[#1e293b] leading-snug">{product.name}</p>
                      </article>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#64748b] mb-3">No products match your search.</p>
                <button
                  onClick={() => { setSearch(''); setIndustry('all'); }}
                  className="text-sm text-[#1558a7] font-semibold hover:underline"
                >
                  Clear all filters
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
