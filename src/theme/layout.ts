import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Design system layout constants.
 * Standardizes common element sizing, paddings, and navigation dimensions
 * to ensure alignment and structure.
 */

export const layout = {
  // Screen/Window physical dimensions
  window: {
    width,
    height,
    isSmallDevice: width < 375,
  },

  // Layout boundaries
  containerWidth: '100%',
  maxContentWidth: 480, // SaaS/Notion-inspired maximum content width for readability on larger screens
  
  // Grid alignment
  screenPadding: 16,
  cardPadding: 16,

  // Input & action height scales
  buttonHeight: {
    sm: 36, // Compact buttons (e.g. inline filters, small list items)
    md: 48, // Standard primary actions
    lg: 56, // Large prominent call-to-actions
  },
  
  inputHeight: 48,
  
  // Navigation layout dimensions
  headerHeight: 56,
  bottomTabHeight: 64,

  // Icon size scale
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24, // Standard default icon size
    lg: 32,
    xl: 40,
  },

  // Avatar size scale
  avatarSize: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  },
} as const;

export type Layout = typeof layout;
