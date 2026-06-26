import { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical, Wheat, Sparkles, Microscope } from 'lucide-react';
import { industries } from '../data/industries';
import CtaBanner from '../components/CtaBanner';
import SubcategorySlideshow from '../components/SubcategorySlideshow';

// Icons keyed to industry id
const industryIcons: Record<string, React.ElementType> = {
  pharma: FlaskConical,
  food: Wheat,
  personal: Sparkles,
  lab: Microscope,
};

export default function CategoryPage() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const industry = industries.find(i => i.slug === slug);

  useEffect(() => {
    if (hash) {
      // Let the section render, then scroll to the anchored sub-category.
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo({ top: 0 });
  }, [slug, hash]);

  if (!industry) {
    return (
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <h1 className="text-2xl font-bold text-[#0f1e35] mb-2">Category not found</h1>
          <p className="text-[#64748b] text-sm mb-6">This product category doesn't exist.</p>
          <Link to="/products" className="btn-primary px-6 py-2.5 text-sm inline-block">View All Products</Link>
        </div>
      </main>
    );
  }

  const Icon = industryIcons[industry.id] ?? FlaskConical;
  const totalProducts = industry.subcategories.reduce((n, s) => n + s.products.length, 0);

  return (
    <main id="main-content">

      {/* ── Hero — branded gradient using the category colour ── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: `linear-gradient(135deg, ${industry.color} 0%, #0f1e35 100%)` }}
        aria-label={`${industry.name} hero`}
      >
        <div className="absolute inset-0 bg-[#06121f]/20" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm" aria-hidden="true">
                <Icon size={22} className="text-white" strokeWidth={1.75} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/80">Product Category</span>
            </div>
            <h1 className="text-4xl lg:text-[52px] font-bold leading-[1.08] tracking-tight text-white mb-5">
              {industry.name}
            </h1>
            <p className="text-lg leading-relaxed text-white/85 max-w-2xl mb-8">
              {industry.blurb}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact?type=sample" className="btn-primary px-7 py-3.5 text-sm">
                Request a Sample
              </Link>
              <Link to={`/products?industry=${industry.id}`} className="btn-outline-white px-7 py-3.5 text-sm">
                Browse Full Catalogue
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sub-category quick nav ── */}
      <div className="bg-white border-b border-[#e2e8f0] sticky top-[124px] z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] flex-shrink-0 mr-1">Jump to</span>
          {industry.subcategories.map(sub => (
            <a
              key={sub.id}
              href={`#sub-${sub.id}`}
              className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#374151] hover:border-[#1558a7]/40 hover:text-[#1558a7] transition-colors whitespace-nowrap"
            >
              {sub.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── Sub-category sections ── */}
      <div className="bg-white">
        {industry.subcategories.map((sub, idx) => (
          <section
            key={sub.id}
            id={`sub-${sub.id}`}
            className={`scroll-mt-[180px] py-16 lg:py-20 ${idx % 2 === 1 ? 'bg-[#f6f8fa]' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-end justify-between gap-4 mb-7">
                <div>
                  <span
                    className="inline-block text-[11px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: industry.color }}
                  >
                    {industry.name}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e35] leading-snug">{sub.name}</h2>
                </div>
                <span className="text-sm text-[#94a3b8] flex-shrink-0 hidden sm:block">
                  {sub.products.length} products
                </span>
              </div>

              {/* Image slideshow band — slides drop in via each sub-category's `images` array */}
              <div className="mb-8">
                <SubcategorySlideshow images={sub.images} color={industry.color} name={sub.name} />
              </div>

              <motion.ul
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none"
              >
                {sub.products.map(product => (
                  <li key={product}>
                    <article className="bg-white border border-[#e2e8f0] rounded-lg p-4 h-full flex items-center hover:border-[#1558a7]/30 hover:shadow-sm transition-all">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mr-3"
                        style={{ backgroundColor: industry.color }}
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium text-[#1e293b] leading-snug">{product}</p>
                    </article>
                  </li>
                ))}
              </motion.ul>
            </div>
          </section>
        ))}
      </div>

      {/* ── In-page CTA ── */}
      <section className="bg-white border-t border-[#e2e8f0] py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="rounded-2xl px-8 py-10 lg:px-12 lg:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            style={{ background: `linear-gradient(135deg, ${industry.color} 0%, #0f1e35 100%)` }}
          >
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold text-white mb-2">Need something from {industry.name.toLowerCase()}?</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                {totalProducts}+ products across {industry.subcategories.length} categories. Request a sample or quote and our team responds within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link to="/contact?type=sample" className="btn-primary px-7 py-3.5 text-sm">
                Request a Sample
              </Link>
              <Link
                to="/contact?type=rfq"
                className="inline-flex items-center gap-1.5 px-7 py-3.5 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
              >
                Request a Quote <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
