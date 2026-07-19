export const AUTH_MESSAGES = {
  prompt: 'Authenticate to protect your expense data',
  cancelLabel: 'Cancel',
  fallbackLabel: 'Use Passcode',
  failed: 'Authentication failed. Please try again.',
  cancelled: 'Authentication was cancelled.',
  lockout: 'Too many attempts. Please try again later.',
  notEnrolled: 'No biometrics enrolled on this device.',
  noHardware: 'This device does not support biometric authentication.',
  unavailable: 'Biometric authentication is currently unavailable.',
  unknown: 'An unexpected error occurred.',
} as const;

export const AUTH_CONFIG = {
  promptMessage: AUTH_MESSAGES.prompt,
  cancelLabel: AUTH_MESSAGES.cancelLabel,
  fallbackLabel: AUTH_MESSAGES.fallbackLabel,
  disableDeviceFallback: false,
  requireConfirmation: false,
} as const;
