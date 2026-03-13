/**
 * M3 Color Tokens — Single source of truth
 * Used by both ui-web (via CSS variables) and ui-mobile (imported directly)
 */

export const m3Colors = {
  // Primary
  primary: '#9A76BE',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EDE0FF',
  onPrimaryContainer: '#583D72',

  // Secondary
  secondary: '#FFA33C',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FFE5C4',
  onSecondaryContainer: '#4D2800',

  // Tertiary
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',

  // Error
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  // Surface
  surface: '#FFFFFF',
  surfaceDim: '#D9D9D9',
  surfaceBright: '#FFFFFF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F7F7F7',
  surfaceContainer: '#F1F1F1',
  surfaceContainerHigh: '#EBEBEB',
  surfaceContainerHighest: '#E3E3E3',
  onSurface: '#1D1B20',
  onSurfaceVariant: '#49454F',
  outline: '#7A7A7A',
  outlineVariant: '#C9C9C9',
  inverseSurface: '#313131',
  inverseOnSurface: '#F4F4F4',
  inversePrimary: '#D0BCFF',
  scrim: '#000000',
  shadow: '#000000',
} as const

export type M3Colors = typeof m3Colors
