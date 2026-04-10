import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { industries } from '../data/industries';
import IndustryIcon from '../components/IndustryIcon';

interface ProductCard {
  name: string;
  industryId: string;
  industryName: string;
}

// Flatten all products into a single searchable list
const allProducts: ProductCard[] = industries.flatMap((ind) =>
  ind.products.map((p) => ({
    name: p,
    industryId: ind.id,
    industryName: ind.name,
  }))
);

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const activeIndustry = searchParams.get('industry') ?? 'all';

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const filtered = useMemo(() => {
    let result = allProducts;
    if (activeIndustry !== 'all') {
      result = result.filter((p) => p.industryId === activeIndustry);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.industryName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeIndustry, search]);

  function setIndustry(id: string) {
    if (id === 'all') {
      searchParams.delete('industry');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ industry: id });
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#F7F9FC]">
      {/* Page header */}
      <div className="bg-[#071228] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our Product Catalogue
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#8A9BB0] text-lg max-w-2xl"
          >
            Browse 500+ premium raw ingredients sourced from certified global suppliers.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Search bar */}
        <div className="relative max-w-lg mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9BB0]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search products or ingredients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0D1F3C] placeholder:text-[#8A9BB0] focus:outline-none focus:ring-2 focus:ring-[#0A8C7A]/40 focus:border-[#0A8C7A] transition"
            aria-label="Search products"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9BB0] hover:text-[#0D1F3C]"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Sidebar filter */}
          <aside className="lg:w-56 flex-shrink-0" aria-label="Filter by industry">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB0] mb-4">
              Filter by Industry
            </h2>
            <ul className="flex flex-row flex-wrap lg:flex-col gap-2 list-none" role="list">
              <li>
                <button
                  onClick={() => setIndustry('all')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeIndustry === 'all'
                      ? 'bg-[#0A8C7A] text-white shadow-md shadow-[#0A8C7A]/20'
                      : 'bg-white border border-gray-200 text-[#0D1F3C] hover:border-[#0A8C7A]/40'
                  }`}
                  aria-pressed={activeIndustry === 'all'}
                >
                  All Industries
                </button>
              </li>
              {industries.map((ind) => (
                <li key={ind.id}>
                  <button
                    onClick={() => setIndustry(ind.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      activeIndustry === ind.id
                        ? 'bg-[#0A8C7A] text-white shadow-md shadow-[#0A8C7A]/20'
                        : 'bg-white border border-gray-200 text-[#0D1F3C] hover:border-[#0A8C7A]/40'
                    }`}
                    aria-pressed={activeIndustry === ind.id}
                  >
                    <span className={activeIndustry === ind.id ? 'text-white/80' : 'text-[#0A8C7A]'}>
                      <IndustryIcon id={ind.icon} size={14} />
                    </span>
                    {ind.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <p className="text-sm text-[#8A9BB0] mb-5">
              Showing <strong className="text-[#0D1F3C]">{filtered.length}</strong> products
            </p>

            <AnimatePresence mode="wait">
              <motion.ul
                key={activeIndustry + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 list-none"
                role="list"
              >
                {filtered.map((product, i) => (
                  <motion.li
                    key={product.name + product.industryId}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <article className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#0A8C7A]/40 hover:shadow-sm transition-all h-full">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A8C7A]/10 text-[#0A8C7A] text-xs font-semibold mb-3">
                        <IndustryIcon id={product.industryId} size={11} />
                        {product.industryName}
                      </span>
                      <p className="text-[#0D1F3C] text-sm font-medium leading-snug">
                        {product.name}
                      </p>
                    </article>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#8A9BB0] text-lg">No products match your search.</p>
                <button
                  onClick={() => { setSearch(''); setIndustry('all'); }}
                  className="mt-4 text-[#0A8C7A] text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
