import { brandMap, fallbackMap, FallbackIcon } from '../../lib/techBrands';
import { cn } from '../../lib/utils';

interface TechIconProps {
  name: string;
  className?: string;
}

/** Renders a brand logo (simple-icons) or a Lucide fallback for a tech name. */
export function TechIcon({ name, className }: TechIconProps) {
  const brand = brandMap[name];

  if (brand) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label={name}
        className={cn('h-full w-full', className)}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Fallback = fallbackMap[name] ?? FallbackIcon;
  return <Fallback aria-label={name} className={cn('h-full w-full', className)} />;
}
