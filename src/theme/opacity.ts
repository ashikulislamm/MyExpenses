/**
 * Design system opacity values.
 * Standardizes opacity values across interactive, focus, disabled, and overlay states.
 */

export const opacity = {
  // Fully invisible
  none: 0,

  // Hover states (primarily web or desktop pointer interactions)
  hover: 0.08,

  // Active / pressed states (e.g. TouchableOpacity behavior)
  pressed: 0.6,

  // Disabled interactive components (buttons, input fields)
  disabled: 0.5,

  // Modals, card overlays
  overlay: 0.4,

  // Screen background/modal dims
  backdrop: 0.5,

  // Fully visible
  solid: 1,
} as const;

export type Opacity = typeof opacity;
