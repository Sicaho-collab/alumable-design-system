import * as React from 'react'
import { cn } from '../lib/utils'

export interface NavBarItem {
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  badge?: number | boolean
}

export interface NavigationBarProps {
  items: NavBarItem[]
  activeIndex: number
  onSelect: (index: number) => void
  className?: string
}

export function NavigationBar({ items, activeIndex, onSelect, className }: NavigationBarProps) {
  return (
    <nav
      className={cn(
        'flex items-end justify-around bg-m3-surface-container h-[80px] px-2 border-t border-m3-outline-variant',
        className
      )}
      aria-label="Bottom navigation"
    >
      {items.map((item, i) => {
        const active = i === activeIndex
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-current={active ? 'page' : undefined}
            className="flex flex-col items-center gap-1 px-4 py-3 min-w-[64px] group"
          >
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  'absolute inset-0 -inset-x-4 rounded-m3-full transition-all duration-200',
                  active ? 'bg-m3-secondary-container' : 'group-hover:bg-m3-on-surface/8'
                )}
              />
              <span className={cn('relative z-10 [&_svg]:size-6', active ? 'text-m3-on-secondary-container' : 'text-m3-on-surface-variant')}>
                {active && item.activeIcon ? item.activeIcon : item.icon}
              </span>
              {item.badge !== undefined && (
                <span className={cn(
                  'absolute -top-1 -right-2 rounded-full bg-m3-error text-m3-on-error text-[10px] font-medium leading-none z-20',
                  typeof item.badge === 'boolean' ? 'size-2' : 'min-w-[16px] h-4 px-1 flex items-center justify-center'
                )}>
                  {typeof item.badge === 'number' ? (item.badge > 99 ? '99+' : item.badge) : ''}
                </span>
              )}
            </div>
            <span className={cn('text-xs transition-colors', active ? 'font-medium text-m3-on-surface' : 'text-m3-on-surface-variant')}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}