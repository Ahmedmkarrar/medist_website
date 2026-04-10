import { useState } from 'react';
import type { Supplier } from '../data/suppliers';

export default function SupplierLogo({ supplier }: { supplier: Supplier }) {
  const [imgError, setImgError] = useState(false);
  const hasLogo = !!supplier.logo && !imgError;

  return (
    <div className="flex-shrink-0 w-36 h-16 bg-white border border-[#e2e8f0] rounded-lg flex items-center justify-center mx-3 hover:border-[#1d5fa8]/30 hover:shadow-sm transition-all">
      {hasLogo ? (
        <img
          src={supplier.logo}
          alt={supplier.name}
          onError={() => setImgError(true)}
          className="max-w-[110px] max-h-[48px] object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-[#374151] font-semibold text-xs text-center px-3 leading-tight">
          {supplier.name}
        </span>
      )}
    </div>
  );
}
