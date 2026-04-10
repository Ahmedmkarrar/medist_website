import {
  Wheat,
  Candy,
  Milk,
  GlassWater,
  Popcorn,
  ChefHat,
  Beef,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  bakery: Wheat,
  confectionery: Candy,
  dairy: Milk,
  beverages: GlassWater,
  snacks: Popcorn,
  culinary: ChefHat,
  meat: Beef,
};

interface IndustryIconProps {
  id: string;
  size?: number;
}

export default function IndustryIcon({ id, size = 24 }: IndustryIconProps) {
  const Icon = iconMap[id] ?? ChefHat;
  return <Icon size={size} strokeWidth={1.75} />;
}
