export enum AuthenticationStatus {
  Success = 'success',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Lockout = 'lockout',
  NotEnrolled = 'not_enrolled',
  NoHardware = 'no_hardware',
  Unavailable = 'unavailable',
  Unknown = 'unknown',
}

export enum AuthenticationMethod {
  Fingerprint = 'fingerprint',
  FacialRecognition = 'facial_recognition',
  Iris = 'iris',
  DeviceCredential = 'device_credential',
  Unknown = 'unknown',
}

export interface AuthenticationResult {
  readonly status: AuthenticationStatus;
  readonly method?: AuthenticationMethod;
  readonly error?: string;
}

export interface AuthenticationConfig {
  readonly promptMessage: string;
  readonly cancelLabel?: string;
  readonly fallbackLabel?: string;
  readonly disableDeviceFallback?: boolean;
  readonly requireConfirmation?: boolean;
}

export interface BiometricState {
  readonly isLoading: boolean;
  readonly result: AuthenticationResult | null;
}

export type AuthenticateFunction = () => Promise<AuthenticationResult>;
