import * as React from 'react'
import { cn } from '../lib/utils'

export interface NavRailItem {
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  badge?: number | boolean
}

export interface NavigationRailProps {
  items: NavRailItem[]
  activeIndex: number
  onSelect: (index: number) => void
  header?: React.ReactNode
  className?: string
}

export function NavigationRail({ items, activeIndex, onSelect, header, className }: NavigationRailProps) {
  return (
    <nav
      className={cn(
        'flex flex-col items-center w-[80px] min-h-full bg-m3-surface-container py-4 gap-1 border-r border-m3-outline-variant',
        className
      )}
      aria-label="Side navigation"
    >
      {header && <div className="mb-4">{header}</div>}
      {items.map((item, i) => {
        const active = i === activeIndex
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-current={active ? 'page' : undefined}
            className="flex flex-col items-center gap-1 w-full py-3 px-2 group"
          >
            <div className="relative flex items-center justify-center w-[56px] h-8 rounded-m3-full transition-all duration-200 group-hover:bg-m3-on-surface/8">
              <div className={cn('absolute inset-0 rounded-m3-full transition-all duration-200', active && 'bg-m3-secondary-container')} />
              <span className={cn('relative z-10 [&_svg]:size-6', active ? 'text-m3-on-secondary-container' : 'text-m3-on-surface-variant')}>
                {active && item.activeIcon ? item.activeIcon : item.icon}
              </span>
              {item.badge !== undefined && (
                <span className={cn(
                  'absolute -top-1 right-1 rounded-full bg-m3-error text-m3-on-error text-[10px] font-medium leading-none z-20',
                  typeof item.badge === 'boolean' ? 'size-2' : 'min-w-[16px] h-4 px-1 flex items-center justify-center'
                )}>
                  {typeof item.badge === 'number' ? (item.badge > 99 ? '99+' : item.badge) : ''}
                </span>
              )}
            </div>
            <span className={cn('text-[11px] text-center leading-tight transition-colors', active ? 'font-medium text-m3-on-surface' : 'text-m3-on-surface-variant')}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
