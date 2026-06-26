interface MedistLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  /** Explicit pixel height — overrides the `size` preset when provided. */
  heightPx?: number;
}

export default function MedistLogo({ className = '', variant = 'dark', size = 'md', heightPx }: MedistLogoProps) {
  const height = heightPx ?? (size === 'lg' ? 110 : size === 'sm' ? 64 : 76);

  return (
    <img
      src="/logos/medist-logo.png"
      alt="Medist FZE"
      height={height}
      decoding="async"
      fetchPriority="high"
      style={{
        height,
        width: 'auto',
        display: 'block',
        filter: variant === 'light' ? 'brightness(0) invert(1)' : undefined,
      }}
      className={className}
    />
  );
}
