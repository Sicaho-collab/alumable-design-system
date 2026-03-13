import * as React from 'react'
import { format, parseISO } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { SimpleCalendar } from './simple-calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export interface DatePickerProps {
  /** Selected date as ISO string (yyyy-MM-dd) or Date object */
  value?: string | Date
  /** Called with ISO string when date changes */
  onChange?: (iso: string) => void
  /** Called with Date object when date changes */
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  /** Minimum selectable date (ISO string or Date) */
  min?: string | Date
  /** Maximum selectable date (ISO string or Date) */
  max?: string | Date
  /** Label text above the picker */
  label?: string
  /** Error message */
  error?: string
  /** Supporting helper text */
  supportingText?: string
  /** Blur handler */
  onBlur?: () => void
  className?: string
}

function toDate(v: string | Date | undefined): Date | undefined {
  if (!v) return undefined
  if (v instanceof Date) return v
  try { return parseISO(v) } catch { return undefined }
}

function toISO(d: Date): string {
  return format(d, 'yyyy-MM-dd')
}

function DatePicker({
  value,
  onChange,
  onDateChange,
  placeholder = 'Pick a date',
  disabled = false,
  min,
  max,
  label,
  error,
  supportingText,
  onBlur,
  className,
}: DatePickerProps) {
  const selectedDate = toDate(value)
  const minDate = toDate(min)
  const maxDate = toDate(max)

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange?.(toISO(date))
      onDateChange?.(date)
    } else {
      onChange?.('')
      onDateChange?.(undefined)
    }
    onBlur?.()
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-sm font-semibold text-m3-on-surface">
          {label}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            onBlur={onBlur}
            className={cn(
              'flex items-center gap-2 w-full px-3 py-2.5',
              'rounded-m3-sm border shadow-soft bg-m3-surface',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:pointer-events-none',
              error
                ? 'border-m3-error focus-visible:ring-m3-error'
                : 'border-m3-outline-variant/60',
            )}
          >
            <CalendarIcon className="w-4 h-4 text-m3-on-surface-variant shrink-0" />
            {selectedDate ? (
              <span className="text-sm text-m3-on-surface">{format(selectedDate, 'PPP')}</span>
            ) : (
              <span className="text-sm text-m3-on-surface-variant">{placeholder}</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <SimpleCalendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-xs text-m3-error" role="alert">{error}</p>
      )}
      {!error && supportingText && (
        <p className="text-xs text-m3-on-surface-variant">{supportingText}</p>
      )}
    </div>
  )
}

export { DatePicker }
