import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const fabVariants = cva(
  'inline-flex items-center justify-center gap-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-m3-primary shadow-m3-3 hover:shadow-m3-4 active:shadow-m3-3 select-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        surface:
          'bg-m3-surface-container-high text-m3-primary',
        primary:
          'bg-m3-primary-container text-m3-on-primary-container',
        secondary:
          'bg-m3-secondary-container text-m3-on-secondary-container',
        tertiary:
          'bg-m3-tertiary-container text-m3-on-tertiary-container',
      },
      size: {
        sm: 'h-10 w-10 rounded-m3-md [&_svg]:size-5',
        md: 'h-14 w-14 rounded-m3-lg [&_svg]:size-6',
        lg: 'h-24 w-24 rounded-m3-xl [&_svg]:size-9',
        extended: 'h-14 px-4 rounded-m3-lg [&_svg]:size-6 font-medium text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface FABProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  icon?: React.ReactNode
}

const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(fabVariants({ variant, size, className }))}
      {...props}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  )
)
FAB.displayName = 'FAB'

export { FAB, fabVariants }
