import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  cell?: (row: T) => React.ReactNode
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
  stickyHeader?: boolean
  className?: string
  rowClassName?: (row: T, index: number) => string
  onRowClick?: (row: T) => void
  emptyState?: React.ReactNode
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  sortKey,
  sortDir,
  onSort,
  stickyHeader = false,
  className,
  rowClassName,
  onRowClick,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-m3-md border border-m3-outline-variant', className)}>
      <table className="w-full border-collapse text-sm">
        <thead className={cn('bg-m3-surface-container', stickyHeader && 'sticky top-0 z-10')}>
          <tr>
            {columns.map((col) => {
              const isSorted = sortKey === col.key
              const alignClass =
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
              return (
                <th
                  key={String(col.key)}
                  className={cn(
                    'px-4 py-3 font-medium text-m3-on-surface-variant border-b border-m3-outline-variant select-none',
                    alignClass,
                    col.sortable && 'cursor-pointer hover:bg-m3-on-surface/4 transition-colors'
                  )}
                  onClick={() => col.sortable && onSort?.(String(col.key))}
                  aria-sort={isSorted ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="text-m3-on-surface-variant/60">
                        {isSorted ? (
                          sortDir === 'asc' ? (
                            <ChevronUp className="size-4" />
                          ) : (
                            <ChevronDown className="size-4" />
                          )
                        ) : (
                          <ChevronsUpDown className="size-4" />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-m3-on-surface-variant">
                {emptyState ?? 'No data available'}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-m3-outline-variant last:border-0 transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-m3-on-surface/4',
                  rowClassName?.(row, i)
                )}
              >
                {columns.map((col) => {
                  const alignClass =
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  return (
                    <td
                      key={String(col.key)}
                      className={cn('px-4 py-3 text-m3-on-surface', alignClass)}
                    >
                      {col.cell ? col.cell(row) : String(row[col.key as keyof T] ?? '')}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
