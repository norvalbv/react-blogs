import { DefTheme } from 'types';
import { create } from 'zustand';

type ThemeState = {
  theme: DefTheme | null;
  setTheme: (theme: DefTheme | null) => void;
};

const useStore = create<ThemeState>()((set) => ({
  theme: null,
  setTheme: (theme: DefTheme | null): void => set({ theme }),
}));

export default useStore;
