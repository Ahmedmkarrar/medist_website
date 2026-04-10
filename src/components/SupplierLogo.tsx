import { useState } from 'react';
import type { Supplier } from '../data/suppliers';

export default function SupplierLogo({ supplier }: { supplier: Supplier }) {
  const [imgError, setImgError] = useState(false);
  const hasLogo = !!supplier.logo && !imgError;

  const inner = (
    <div className="flex-shrink-0 w-36 h-16 bg-white border border-[#e2e8f0] rounded-lg flex items-center justify-center mx-3 hover:border-[#1558a7]/30 hover:shadow-sm transition-all group cursor-pointer">
      {hasLogo ? (
        <img
          src={supplier.logo}
          alt={supplier.name}
          onError={() => setImgError(true)}
          className="max-w-[110px] max-h-[44px] object-contain grayscale brightness-0 opacity-60 group-hover:opacity-90 transition-all"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <span className="text-[#94a3b8] group-hover:text-[#374151] font-semibold text-xs text-center px-3 leading-tight transition-colors">
          {supplier.name}
        </span>
      )}
    </div>
  );

  if (supplier.url) {
    return (
      <a
        href={supplier.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${supplier.name}`}
      >
        {inner}
      </a>
    );
  }

  return inner;
}
