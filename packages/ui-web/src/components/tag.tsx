import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-m3-sm font-medium text-xs transition-all duration-200 select-none',
  {
    variants: {
      variant: {
        filled: 'bg-m3-primary text-m3-on-primary',
        tonal: 'bg-m3-primary-container text-m3-on-primary-container',
        outlined: 'border border-m3-outline text-m3-on-surface',
        surface: 'bg-m3-surface-container-high text-m3-on-surface',
      },
      size: {
        sm: 'h-6 px-2 text-[11px]',
        md: 'h-7 px-2.5 text-xs',
        lg: 'h-8 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'tonal',
      size: 'md',
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
  icon?: React.ReactNode
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, onRemove, icon, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, size, className }))}
      {...props}
    >
      {icon && <span className="shrink-0 [&_svg]:size-3.5">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 transition-colors -mr-0.5"
          aria-label="Remove tag"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  )
)
Tag.displayName = 'Tag'

export { Tag, tagVariants }
