import { TextStyle } from 'react-native';

/**
 * Design system typography scale.
 * Custom font family configuration pointing to 'Inter' as requested.
 *
 * Each token conforms to React Native TextStyle specifications,
 * ensuring seamless mapping onto standard text components.
 */

export interface TypographyStyle {
  readonly fontFamily: string;
  readonly fontWeight: TextStyle['fontWeight'];
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly letterSpacing?: number;
}

const family = 'Inter';

export const typography = {
  // Ultra-large title, used for dashboards or numbers (e.g. total balance)
  display: {
    fontFamily: family,
    fontWeight: '700',
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -1,
  },

  // Main page headers
  h1: {
    fontFamily: family,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },

  // Section headers
  h2: {
    fontFamily: family,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.4,
  },

  // Subsection headers
  h3: {
    fontFamily: family,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.3,
  },

  // Small headers or card titles
  h4: {
    fontFamily: family,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.2,
  },

  // Prominent labels or item headings
  title: {
    fontFamily: family,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.1,
  },

  // Subheadings or metadata sections
  subtitle: {
    fontFamily: family,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.1,
  },

  // Large body copy, highly readable
  bodyLarge: {
    fontFamily: family,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Primary body copy
  body: {
    fontFamily: family,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },

  // Secondary body copy, descriptions
  bodySmall: {
    fontFamily: family,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Minor annotations, dates, small captions
  caption: {
    fontFamily: family,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },

  // Tiny capitalised labels
  overline: {
    fontFamily: family,
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
  },

  // Button text
  button: {
    fontFamily: family,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  // Form label headers
  label: {
    fontFamily: family,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
} as const satisfies Record<string, TypographyStyle>;

export type Typography = typeof typography;
