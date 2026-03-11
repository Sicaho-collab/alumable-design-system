'use client'
import * as React from 'react'
import { cn } from '../lib/utils'

interface Step {
  label: string
}

interface M3StepperProps {
  steps: Step[]
  current: number   // 1-indexed
  className?: string
}

/**
 * Simple horizontal stepper for wizard flows.
 * Uses 1-indexed `current` prop. For the full-featured stepper with
 * vertical orientation, state management, and step content, use `Stepper` instead.
 */
export default function M3Stepper({ steps, current, className }: M3StepperProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, i) => {
        const n     = i + 1
        const done  = n < current
        const active = n === current

        return (
          <React.Fragment key={n}>
            {/* Connector line (between steps) */}
            {i > 0 && (
              <div
                className={cn(
                  'flex-1 h-[2px] mx-2 transition-colors duration-300',
                  done ? 'bg-m3-primary' : 'bg-m3-outline-variant'
                )}
              />
            )}

            {/* Step circle + label */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className={cn(
                  'w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300',
                  done
                    ? 'bg-m3-primary text-m3-on-primary'
                    : active
                      ? 'border-2 border-m3-primary bg-m3-primary-container text-m3-on-primary-container'
                      : 'bg-m3-surface-container-high text-m3-on-surface-variant'
                )}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : n}
              </div>
              <span
                className={cn(
                  'text-sm whitespace-nowrap transition-colors duration-200 hidden sm:inline',
                  active
                    ? 'font-semibold text-m3-primary'
                    : done
                      ? 'font-medium text-m3-on-surface'
                      : 'text-m3-on-surface-variant'
                )}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export { M3Stepper }
export type { M3StepperProps, Step as M3StepperStep }
