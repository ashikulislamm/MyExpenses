/**
 * Design system spacing scale using an 8-point base grid.
 * Provides both descriptive (semantic) and numeric-linked mappings.
 */

export const spacing = {
  // Semantic spacing
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  xxxxxl: 48,
  layoutSm: 56,
  layout: 64,
  layoutLg: 72,
  layoutXl: 80,
  layoutXxl: 96,

  // Numeric-linked grid alias map
  s0: 0,
  s2: 2,
  s4: 4,
  s8: 8,
  s12: 12,
  s16: 16,
  s20: 20,
  s24: 24,
  s32: 32,
  s40: 40,
  s48: 48,
  s56: 56,
  s64: 64,
  s72: 72,
  s80: 80,
  s96: 96,
} as const;

export type Spacing = typeof spacing;
