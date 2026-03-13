import * as React from 'react'
import { cn } from '../lib/utils'

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  overline?: string
  headline: string
  supporting?: string
  disabled?: boolean
  selected?: boolean
  interactive?: boolean
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ leading, trailing, overline, headline, supporting, disabled, selected, interactive = true, className, ...props }, ref) => (
    <div
      ref={ref}
      role={interactive ? 'listitem' : undefined}
      aria-disabled={disabled}
      aria-selected={selected}
      className={cn(
        'flex items-center gap-4 px-4 min-h-[56px] py-2 transition-colors',
        interactive && !disabled && 'cursor-pointer hover:bg-m3-on-surface/8',
        selected && 'bg-m3-primary-container',
        disabled && 'opacity-38 pointer-events-none',
        className
      )}
      {...props}
    >
      {leading && (
        <div className="shrink-0 flex items-center justify-center text-m3-on-surface-variant [&_svg]:size-6">
          {leading}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {overline && <p className="text-[11px] font-medium tracking-wider text-m3-on-surface-variant uppercase">{overline}</p>}
        <p className={cn('text-sm text-m3-on-surface truncate', selected && 'font-medium text-m3-on-primary-container')}>{headline}</p>
        {supporting && <p className="text-xs text-m3-on-surface-variant mt-0.5 line-clamp-2">{supporting}</p>}
      </div>
      {trailing && (
        <div className="shrink-0 text-m3-on-surface-variant [&_svg]:size-6">
          {trailing}
        </div>
      )}
    </div>
  )
)
ListItem.displayName = 'ListItem'

export const List = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} role="list" className={cn('rounded-m3-md overflow-hidden', className)} {...props}>
      {children}
    </div>
  )
)
List.displayName = 'List'

export const ListDivider = () => (
  <div className="h-px bg-m3-outline-variant mx-4" role="separator" />
)
