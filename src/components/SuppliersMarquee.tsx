import { suppliers } from '../data/suppliers';
import SupplierLogo from './SupplierLogo';

const doubled = [...suppliers, ...suppliers];

export default function SuppliersMarquee() {
  return (
    <section className="bg-white border-y border-[#e2e8f0] py-12 overflow-hidden" aria-label="Certified supply partners">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-7 text-center">
        <p className="section-label">Our Certified Supply Partners</p>
      </div>

      <div className="marquee-wrapper relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
          aria-hidden="true"
        />

        <div className="marquee-track" aria-hidden="true">
          {doubled.map((supplier, i) => (
            <SupplierLogo key={`${supplier.name}-${i}`} supplier={supplier} />
          ))}
        </div>
      </div>
    </section>
  );
}
