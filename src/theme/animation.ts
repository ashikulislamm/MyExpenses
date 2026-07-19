import { Easing } from 'react-native';

/**
 * Design system animation and motion specifications.
 * Defines standard durations and custom easing curves for transitions,
 * dialog reveals, button scales, and fade-ins.
 */

export const animation = {
  // Duration scales (in milliseconds)
  duration: {
    fastest: 100, // micro-interactions (e.g. checkbox checks, hover flashes)
    fast: 150,    // button scales, tag selection transitions
    normal: 200,  // layout animations, tabs, page navigations
    slow: 300,    // modal entry/exits, drawer expansions
    slowest: 500, // heavy screen-to-screen transitions
  },

  // Easing presets matching premium design language
  easing: {
    // Standard system easing (In-Out) - Material/iOS default
    standard: Easing.bezier(0.4, 0, 0.2, 1),

    // Decelerate (Ease Out) - for incoming entry animations
    decelerate: Easing.bezier(0, 0, 0.2, 1),

    // Accelerate (Ease In) - for outgoing exit animations
    accelerate: Easing.bezier(0.4, 0, 1, 1),

    // Stripe / Linear Decelerating Curve - extremely smooth reveal
    smooth: Easing.bezier(0.16, 1, 0.3, 1),
    
    // Spring-like anticipation (ease in, spring out)
    anticipate: Easing.bezier(0.34, 1.56, 0.64, 1),
  },
} as const;

export type Animation = typeof animation;
