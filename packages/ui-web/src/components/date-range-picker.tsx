'use client'

import * as React from 'react'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  isToday,
} from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

import { cn } from '../lib/utils'
import { Button } from './button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './card'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DateRangePickerProps {
  /** Card title */
  title?: string
  /** Card description */
  description?: string
  /** Text for confirm button */
  confirmText?: string
  /** Text for cancel button */
  cancelText?: string
  /** Pre-selected start date */
  initialStartDate?: Date
  /** Pre-selected end date */
  initialEndDate?: Date
  /** Called with selected range on confirm */
  onConfirm?: (range: { startDate: Date | null; endDate: Date | null }) => void
  /** Called on cancel */
  onCancel?: () => void
  /** Controlled start date (external state) */
  startDate?: Date | null
  /** Controlled end date (external state) */
  endDate?: Date | null
  /** Called when dates change (controlled mode) */
  onChange?: (range: { startDate: Date | null; endDate: Date | null }) => void
  /** Hide the card wrapper — render only the calendar */
  inline?: boolean
  /** Additional class name */
  className?: string
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

// ─── Component ────────────────────────────────────────────────────────────────

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      title = 'Select dates',
      description,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      initialStartDate,
      initialEndDate,
      onConfirm,
      onCancel,
      startDate: controlledStart,
      endDate: controlledEnd,
      onChange,
      inline = false,
      className,
    },
    ref,
  ) => {
    // Controlled vs uncontrolled
    const isControlled = controlledStart !== undefined
    const [uncontrolledStart, setUncontrolledStart] = React.useState<Date | null>(
      initialStartDate || null,
    )
    const [uncontrolledEnd, setUncontrolledEnd] = React.useState<Date | null>(
      initialEndDate || null,
    )

    const startDate = isControlled ? controlledStart : uncontrolledStart
    const endDate = isControlled ? controlledEnd : uncontrolledEnd

    const setDates = (start: Date | null, end: Date | null) => {
      if (isControlled) {
        onChange?.({ startDate: start, endDate: end })
      } else {
        setUncontrolledStart(start)
        setUncontrolledEnd(end)
      }
    }

    const [currentMonth, setCurrentMonth] = React.useState(
      startOfMonth(initialStartDate || new Date()),
    )

    // Build calendar grid (Mon-start weeks)
    const days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
    })

    const handleDateClick = (day: Date) => {
      if (!startDate || (startDate && endDate)) {
        setDates(day, null)
      } else if (isBefore(day, startDate)) {
        setDates(day, null)
      } else {
        setDates(startDate, day)
      }
    }

    const handleConfirm = () => {
      onConfirm?.({ startDate: startDate ?? null, endDate: endDate ?? null })
    }

    // ─── Calendar grid ────────────────────────────────────────────────

    const calendarGrid = (
      <div className="flex flex-col">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm font-semibold text-m3-on-surface">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 text-center mb-1">
          {WEEKDAYS.map((d) => (
            <span key={d} className="text-xs font-medium text-m3-on-surface-variant py-1">
              {d}
            </span>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((day) => {
            const isStart = startDate && isSameDay(day, startDate)
            const isEnd = endDate && isSameDay(day, endDate)
            const isSelected = isStart || isEnd
            const isInRange =
              startDate && endDate && isAfter(day, startDate) && isBefore(day, endDate)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const today = isToday(day)

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDateClick(day)}
                className={cn(
                  'relative h-9 w-full text-sm flex items-center justify-center transition-all duration-200',
                  // Hover scale + lift effect
                  'hover:scale-105 active:scale-95',
                  // Default
                  'hover:bg-m3-primary/8 rounded-m3-full',
                  // Outside month
                  !isCurrentMonth && 'text-m3-on-surface/30',
                  // Today indicator
                  today && !isSelected && 'font-bold text-m3-primary ring-1 ring-m3-primary/30',
                  // Selected endpoints
                  isSelected &&
                    'bg-m3-primary text-m3-on-primary rounded-m3-full font-semibold shadow-md shadow-m3-primary/25',
                  // Range middle
                  isInRange && 'bg-m3-primary/10 text-m3-on-primary-container rounded-none',
                  // Range shape: start gets rounded-left, end gets rounded-right
                  isStart && endDate && 'rounded-r-none',
                  isEnd && startDate && 'rounded-l-none',
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>
    )

    // ─── Date display fields ──────────────────────────────────────────

    const dateFields = (
      <div className="flex flex-col gap-4">
        {/* Start date field */}
        <div>
          <label className="text-xs font-medium text-m3-on-surface-variant mb-1 block">
            Start date
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-m3-sm border border-m3-outline-variant/60 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] bg-m3-surface transition-all duration-200 hover:border-m3-primary/50">
            <Calendar className="w-4 h-4 text-m3-on-surface-variant shrink-0" />
            {startDate ? (
              <span className="text-sm font-medium text-m3-primary bg-m3-primary/10 px-3 py-1 rounded-m3-sm">
                {format(startDate, 'dd/MM/yyyy')}
              </span>
            ) : (
              <span className="text-sm text-m3-on-surface-variant">Select start date</span>
            )}
          </div>
        </div>

        {/* End date field */}
        <div>
          <label className="text-xs font-medium text-m3-on-surface-variant mb-1 block">
            End date
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-m3-sm border border-m3-outline-variant/60 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] bg-m3-surface transition-all duration-200 hover:border-m3-primary/50">
            <Calendar className="w-4 h-4 text-m3-on-surface-variant shrink-0" />
            {endDate ? (
              <span className="text-sm font-medium text-m3-primary bg-m3-primary/10 px-3 py-1 rounded-m3-sm">
                {format(endDate, 'dd/MM/yyyy')}
              </span>
            ) : (
              <span className="text-sm text-m3-on-surface-variant">Select end date</span>
            )}
          </div>
        </div>

      </div>
    )

    // ─── Inline mode (no card) ────────────────────────────────────────

    if (inline) {
      return (
        <div ref={ref} className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
          {calendarGrid}
          <div className="flex flex-col justify-between">
            {dateFields}
          </div>
        </div>
      )
    }

    // ─── Card mode ────────────────────────────────────────────────────

    return (
      <Card ref={ref} variant="outlined" className={cn('w-full max-w-3xl shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] border-m3-outline-variant/60 bg-m3-surface/80 backdrop-blur-sm', className)}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-m3-full bg-m3-primary/10">
              <Calendar className="w-5 h-5 text-m3-primary" />
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calendarGrid}
            <div className="flex flex-col justify-between">
              {dateFields}
              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-m3-outline-variant">
                <Button variant="outlined" onClick={onCancel}>
                  {cancelText}
                </Button>
                <Button
                  variant="filled"
                  onClick={handleConfirm}
                  disabled={!startDate}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
)

DateRangePicker.displayName = 'DateRangePicker'
