import { cn } from '@/lib/utils'
import { ProductLabel } from '@/types/product'

const labelConfig: Record<ProductLabel, { label: string; className: string }> = {
  populair: { label: 'Populair', className: 'bg-amber-500/90 text-white' },
  nieuw: { label: 'Nieuw', className: 'bg-emerald-500/90 text-white' },
  promo: { label: 'Promo', className: 'bg-accent/90 text-white' },
  bestseller: { label: 'Bestseller', className: 'bg-charcoal/80 text-white' },
}

interface LabelBadgeProps {
  label: ProductLabel
  className?: string
}

export function LabelBadge({ label, className }: LabelBadgeProps) {
  const config = labelConfig[label]
  return (
    <span
      className={cn(
        'text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
