interface MedistLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function MedistLogo({ className = '', variant = 'dark', size = 'md' }: MedistLogoProps) {
  const height = size === 'lg' ? 56 : size === 'sm' ? 32 : 40;

  return (
    <img
      src="/logos/medist-logo.png"
      alt="Medist FZE"
      height={height}
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
