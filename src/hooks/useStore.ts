import { DefTheme } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
  theme: DefTheme | null;
  setTheme: (theme: DefTheme | null) => void;
};

// ! Doesn't work for user if exporting store directly, the hook useTheme is essentially just a wrapper to prevent bugs.
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      theme: null,
      setTheme: (theme: DefTheme | null): void => {
        return set({ theme });
      },
    }),
    {
      name: 'react-blogs-theme',
    }
  )
);

export default useStore;
