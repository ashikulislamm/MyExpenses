import { create } from 'zustand';

interface SecurityState {
  readonly biometricEnabled: boolean;
  readonly sessionAuthenticated: boolean;
  readonly setBiometricEnabled: (enabled: boolean) => void;
  readonly setSessionAuthenticated: (value: boolean) => void;
  readonly reset: () => void;
}

export const useSecurityStore = create<SecurityState>((set) => ({
  biometricEnabled: false,
  sessionAuthenticated: false,

  setBiometricEnabled: (enabled) => set({ biometricEnabled: enabled }),

  setSessionAuthenticated: (value) => set({ sessionAuthenticated: value }),

  reset: () =>
    set({ biometricEnabled: false, sessionAuthenticated: false }),
}));
