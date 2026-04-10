import { useState } from 'react';
import type { Supplier } from '../data/suppliers';

interface SupplierLogoProps {
  supplier: Supplier;
}

export default function SupplierLogo({ supplier }: SupplierLogoProps) {
  const [imgError, setImgError] = useState(false);
  const hasLogo = !!supplier.logo && !imgError;

  return (
    <a
      href={supplier.url}
      target="_blank"
      rel="noopener noreferrer"
      className="logo-card flex-shrink-0 w-44 h-[84px] bg-white border border-gray-200 rounded-xl flex items-center justify-center mx-3"
      aria-label={`${supplier.name} — visit website`}
    >
      {hasLogo ? (
        <img
          src={supplier.logo}
          alt={supplier.name}
          onError={() => setImgError(true)}
          className="max-w-[130px] max-h-[56px] object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-[#0D1F3C] font-bold text-sm text-center px-4 leading-tight select-none">
          {supplier.name}
        </span>
      )}
    </a>
  );
}
