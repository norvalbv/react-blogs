import { DefTheme } from 'types';
import { create } from 'zustand';

type StoreState = {
  theme: DefTheme | null;
  setTheme: (theme: DefTheme | null) => void;
};

// ! Doesn't work for user if exporting store directly, the hook useTheme is essentially just a wrapper to prevent bugs.
export const useStore = create<StoreState>()((set) => ({
  theme: null,
  setTheme: (theme: DefTheme | null): void => set({ theme }),
}));

export default useStore;
