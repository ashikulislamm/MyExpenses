import { useState, useCallback } from 'react';
import {
  AuthenticationResult,
  BiometricState,
} from '@/types/security.types';
import { BiometricService } from '@/services/security/biometric.service';

interface UseBiometricReturn extends BiometricState {
  readonly authenticate: () => Promise<AuthenticationResult>;
  readonly reset: () => void;
}

export function useBiometric(): UseBiometricReturn {
  const [state, setState] = useState<BiometricState>({
    isLoading: false,
    result: null,
  });

  const authenticate = useCallback(async (): Promise<AuthenticationResult> => {
    setState({ isLoading: true, result: null });

    const result = await BiometricService.authenticate();

    setState({ isLoading: false, result });

    return result;
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, result: null });
  }, []);

  return {
    isLoading: state.isLoading,
    result: state.result,
    authenticate,
    reset,
  };
}
