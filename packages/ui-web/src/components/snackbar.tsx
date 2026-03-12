import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  action?: string
  onAction?: () => void
  onDismiss?: () => void
  open?: boolean
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, message, action, onAction, onDismiss, open = true, ...props }, ref) => {
    if (!open) return null

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'flex items-center gap-2 min-w-[288px] max-w-[560px] bg-m3-inverse-surface text-m3-inverse-on-surface rounded-m3-xs px-4 py-3 shadow-m3-3',
          className
        )}
        {...props}
      >
        <span className="flex-1 text-sm">{message}</span>
        {action && (
          <button
            onClick={onAction}
            className="text-m3-inverse-primary text-sm font-medium hover:opacity-80 transition-opacity px-2"
          >
            {action}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-m3-inverse-on-surface hover:opacity-80 transition-opacity p-0.5"
            aria-label="Dismiss"
          >
            <X className="size-5" />
          </button>
        )}
      </div>
    )
  }
)
Snackbar.displayName = 'Snackbar'

export { Snackbar }
