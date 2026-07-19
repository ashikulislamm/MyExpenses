import { create } from 'zustand';

type AppStatus = 'initializing' | 'onboarding' | 'authenticating' | 'ready';

interface AppState {
  readonly status: AppStatus;
  readonly setStatus: (status: AppStatus) => void;
  readonly reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  status: 'initializing',

  setStatus: (status) => set({ status }),

  reset: () => set({ status: 'initializing' }),
}));
