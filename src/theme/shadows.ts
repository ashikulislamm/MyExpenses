import { ViewStyle } from 'react-native';

/**
 * Design system elevation and shadow tokens.
 * Specifically calibrated to remain soft, professional, and subtle.
 * Avoids harsh native defaults by combining precise offsets and low opacities.
 */

export interface ShadowStyle {
  readonly shadowColor: string;
  readonly shadowOffset: {
    readonly width: number;
    readonly height: number;
  };
  readonly shadowOpacity: number;
  readonly shadowRadius: number;
  readonly elevation: number;
}

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
} as const satisfies Record<string, ShadowStyle>;

export type Shadows = typeof shadows;
