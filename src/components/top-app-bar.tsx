import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const topAppBarVariants = cva(
  'flex items-center w-full px-4 transition-shadow duration-200',
  {
    variants: {
      variant: {
        small: 'h-16 gap-2',
        medium: 'h-[112px] flex-col items-start justify-between py-2 gap-0',
        large: 'h-[152px] flex-col items-start justify-between py-2 gap-0',
        'center-aligned': 'h-16 gap-2 justify-between',
      },
      scrolled: {
        true: 'shadow-m3-2 bg-m3-surface-container',
        false: 'bg-m3-surface',
      },
    },
    defaultVariants: {
      variant: 'small',
      scrolled: false,
    },
  }
)

export interface TopAppBarProps extends VariantProps<typeof topAppBarVariants> {
  title: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  className?: string
}

export function TopAppBar({ title, leading, trailing, variant, scrolled, className }: TopAppBarProps) {
  const isStacked = variant === 'medium' || variant === 'large'
  const isCentered = variant === 'center-aligned'

  if (isStacked) {
    return (
      <header className={cn(topAppBarVariants({ variant, scrolled, className }))}>
        <div className="flex items-center justify-between w-full h-16">
          <div className="flex items-center gap-2">
            {leading}
          </div>
          <div className="flex items-center gap-1">{trailing}</div>
        </div>
        <h1 className={cn(
          'text-m3-on-surface pb-4 leading-none',
          variant === 'medium' ? 'text-[28px]' : 'text-[32px]'
        )}>{title}</h1>
      </header>
    )
  }

  return (
    <header className={cn(topAppBarVariants({ variant, scrolled, className }))}>
      {leading && <div className="flex items-center shrink-0">{leading}</div>}
      <h1 className={cn('text-lg font-medium text-m3-on-surface', isCentered && 'flex-1 text-center')}>{title}</h1>
      {trailing && <div className="flex items-center gap-1 shrink-0 ml-auto">{trailing}</div>}
    </header>
  )
}
