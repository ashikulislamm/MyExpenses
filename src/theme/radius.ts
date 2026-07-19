/**
 * Design system border radius tokens.
 * Used to define standard corner curves for cards, buttons, inputs, and overlays.
 */

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  full: 999, // fully circular elements like badges, avatars or buttons
} as const;

export type Radius = typeof radius;
