/**
 * Production-Ready Global Design System Entrypoint.
 * Exposes all style tokens, type interfaces, styling utilities, and react hooks.
 *
 * Imports are mapped using "@/*" paths to allow clean integration:
 * import { colors, spacing, radius, typography, shadows } from "@/theme";
 */

export { colors, Colors } from './colors';
export { typography, Typography, TypographyStyle } from './typography';
export { spacing, Spacing } from './spacing';
export { radius, Radius } from './radius';
export { shadows, Shadows, ShadowStyle } from './shadows';
export { opacity, Opacity } from './opacity';
export { layout, Layout } from './layout';
export { animation, Animation } from './animation';

export {
  theme,
  Theme,
  ThemeProvider,
  useTheme,
  createStyles,
  useStyles,
  presets,
  hexToRgba,
} from './utils';
