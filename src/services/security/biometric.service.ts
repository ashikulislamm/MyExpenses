import * as LocalAuthentication from 'expo-local-authentication';
import {
  AuthenticationResult,
  AuthenticationStatus,
  AuthenticationMethod,
  AuthenticationConfig,
} from '@/types/security.types';
import { AUTH_CONFIG } from '@/constants/security.constants';

function mapAuthenticationType(
  type: LocalAuthentication.AuthenticationType,
): AuthenticationMethod {
  switch (type) {
    case LocalAuthentication.AuthenticationType.FINGERPRINT:
      return AuthenticationMethod.Fingerprint;
    case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
      return AuthenticationMethod.FacialRecognition;
    case LocalAuthentication.AuthenticationType.IRIS:
      return AuthenticationMethod.Iris;
    default:
      return AuthenticationMethod.Unknown;
  }
}

async function getUsedMethod(): Promise<AuthenticationMethod | undefined> {
  try {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types.length > 0) {
      return mapAuthenticationType(types[0]);
    }
  } catch {}
  return undefined;
}

export const BiometricService = {
  async authenticate(
    config: AuthenticationConfig = AUTH_CONFIG,
  ): Promise<AuthenticationResult> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        return { status: AuthenticationStatus.NoHardware };
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return { status: AuthenticationStatus.NotEnrolled };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: config.promptMessage,
        cancelLabel: config.cancelLabel,
        fallbackLabel: config.fallbackLabel,
        disableDeviceFallback: config.disableDeviceFallback,
        requireConfirmation: config.requireConfirmation,
      });

      const method = await getUsedMethod();

      if (result.success) {
        return { status: AuthenticationStatus.Success, method };
      }

      switch (result.error) {
        case 'user_cancel':
          return { status: AuthenticationStatus.Cancelled, method };
        case 'system_cancel':
          return { status: AuthenticationStatus.Cancelled, method };
        case 'app_cancel':
          return { status: AuthenticationStatus.Cancelled, method };
        case 'lockout':
          return { status: AuthenticationStatus.Lockout, method };
        case 'not_enrolled':
          return { status: AuthenticationStatus.NotEnrolled, method };
        case 'not_available':
          return { status: AuthenticationStatus.Unavailable, method };
        default:
          return { status: AuthenticationStatus.Failed, method };
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return { status: AuthenticationStatus.Unknown, error: message };
    }
  },

  async getAuthenticationType(): Promise<AuthenticationMethod> {
    try {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (types.length > 0) {
        return mapAuthenticationType(types[0]);
      }
      return AuthenticationMethod.Unknown;
    } catch {
      return AuthenticationMethod.Unknown;
    }
  },

  async isAvailable(): Promise<boolean> {
    try {
      const [hasHardware, isEnrolled] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);
      return hasHardware && isEnrolled;
    } catch {
      return false;
    }
  },
};
