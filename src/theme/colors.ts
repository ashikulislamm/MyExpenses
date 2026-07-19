/**
 * Semantic color palette for a minimal, premium, white-themed application.
 * Inspired by Linear, Stripe, Notion, and Apple Wallet.
 */

export const colors = {
  // Primary Brand Color (SaaS Blue)
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',

  // Status Indicators
  success: '#16A34A',
  danger: '#DC2626',
  error: '#DC2626', // developer-friendly alias for danger
  warning: '#F59E0B',
  info: '#0EA5E9',

  // Backgrounds & Surfaces (White Theme & Premium Neutrals)
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  card: '#FFFFFF',
  surface: '#F1F5F9',

  // Borders & Dividers
  border: '#E2E8F0',
  divider: '#F1F5F9',

  // Typography (Slate Scale)
  text: {
    primary: '#0F172A',     // Primary body & headings
    secondary: '#475569',   // Supporting/subtext
    tertiary: '#64748B',    // Helper text & secondary labels
    muted: '#94A3B8',       // Placeholders & subtle metadata
    disabled: '#CBD5E1',    // Disabled interactive elements
    inverse: '#FFFFFF',     // Contrast text on solid colored elements (like primary button)
  },

  // Interactive Icons
  icon: {
    primary: '#0F172A',
    secondary: '#475569',
    disabled: '#CBD5E1',
  },
} as const;

export type Colors = typeof colors;
