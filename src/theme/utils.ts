import React, { createContext, useContext, useMemo } from 'react';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { opacity } from './opacity';
import { layout } from './layout';
import { animation } from './animation';
import { typography } from './typography';

/**
 * Compiled global theme object.
 */
export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  opacity,
  layout,
  animation,
  typography,
} as const;

export type Theme = typeof theme;

/**
 * Theme context for dynamic themes (e.g. dynamic color palettes or settings)
 */
const ThemeContext = createContext<Theme>(theme);

interface ThemeProviderProps {
  readonly themeValue?: Theme;
  readonly children: React.ReactNode;
}

/**
 * Global Theme Provider.
 * Allows wrapping the application to supply custom/dynamic themes if needed in the future.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ themeValue = theme, children }) => {
  return React.createElement(ThemeContext.Provider, { value: themeValue }, children);
};

/**
 * Hook to consume the current theme tokens.
 */
export const useTheme = (): Theme => useContext(ThemeContext);

/**
 * Static stylesheet creator helper.
 * Injects the design system theme directly into a React Native StyleSheet.
 * Highly performant since it evaluates once outside the render cycle.
 *
 * Example:
 * const styles = createStyles((theme) => ({
 *   container: {
 *     padding: theme.spacing.md,
 *     backgroundColor: theme.colors.background,
 *   }
 * }));
 */
export function createStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  stylesFactory: (t: Theme) => T
): T {
  return stylesFactory(theme);
}

/**
 * Hook to generate styled stylesheets dynamically.
 * Automatically recalculates if the theme context changes.
 * Useful if theme swapping, dark/light toggle, or window dimensions change.
 *
 * Example:
 * const styles = useStyles((theme) => ({
 *   box: {
 *     backgroundColor: theme.colors.backgroundSecondary,
 *   }
 * }));
 */
export function useStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  stylesFactory: (t: Theme) => T
): T {
  const currentTheme = useTheme();
  return useMemo(() => stylesFactory(currentTheme), [stylesFactory, currentTheme]);
}

/**
 * Premium Utility styles.
 * Clean, standard visual shortcuts to avoid styling boilerplate.
 */
export const presets = {
  // Flex Direction and Alignments
  flex1: { flex: 1 } as ViewStyle,
  flexGrow: { flexGrow: 1 } as ViewStyle,
  
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  flexCol: {
    flexDirection: 'column',
  } as ViewStyle,

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  alignStart: {
    alignItems: 'flex-start',
  } as ViewStyle,

  alignEnd: {
    alignItems: 'flex-end',
  } as ViewStyle,

  justifyStart: {
    justifyContent: 'flex-start',
  } as ViewStyle,

  justifyEnd: {
    justifyContent: 'flex-end',
  } as ViewStyle,

  // Position Shortcuts
  absoluteFill: StyleSheet.absoluteFill,
  
  // Quick borders
  hairlineBorder: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  } as ViewStyle,
} as const;

/**
 * Utility to convert hex colors to RGBA.
 * Essential for interactive element overlays, badges, and active state highlights.
 *
 * Example: hexToRgba(theme.colors.primary, 0.12)
 */
export function hexToRgba(hex: string, alpha: number): string {
  // Check if standard hex format
  const sanitizedHex = hex.replace('#', '');
  
  let r = 0;
  let g = 0;
  let b = 0;

  if (sanitizedHex.length === 3) {
    r = parseInt(sanitizedHex[0] + sanitizedHex[0], 16);
    g = parseInt(sanitizedHex[1] + sanitizedHex[1], 16);
    b = parseInt(sanitizedHex[2] + sanitizedHex[2], 16);
  } else if (sanitizedHex.length === 6) {
    r = parseInt(sanitizedHex.substring(0, 2), 16);
    g = parseInt(sanitizedHex.substring(2, 4), 16);
    b = parseInt(sanitizedHex.substring(4, 6), 16);
  } else {
    return hex; // Fallback to raw hex if parsing fails
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
