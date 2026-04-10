interface MedistLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function MedistLogo({ className = '', variant = 'dark', size = 'md' }: MedistLogoProps) {
  const textColor = variant === 'light' ? '#ffffff' : '#0f1e35';
  const fontSize  = size === 'lg' ? '22px' : size === 'sm' ? '16px' : '18px';

  return (
    <span
      className={className}
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 700,
        fontSize,
        letterSpacing: '0.08em',
        color: textColor,
        userSelect: 'none',
      }}
    >
      MEDIST
    </span>
  );
}
