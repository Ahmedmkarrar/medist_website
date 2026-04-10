interface MedistLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light'; // kept for prop compatibility, no longer affects output
}

const heights: Record<string, string> = { sm: 'h-8', md: 'h-10', lg: 'h-14' };

export default function MedistLogo({ className = '', size = 'md' }: MedistLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logos/medist-logo.png"
        alt="Medist"
        className={`${heights[size]} w-auto object-contain`}
      />
    </div>
  );
}
