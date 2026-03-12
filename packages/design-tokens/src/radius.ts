/**
 * M3 Border Radius (Shape) Tokens
 */

export const m3Radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 28,
  full: 9999,
} as const

export type M3Radius = typeof m3Radius
