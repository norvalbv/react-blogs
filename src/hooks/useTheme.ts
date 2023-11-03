import { DefTheme } from 'types';
import { useStore } from './useStore';

export const useTheme = (theme?: DefTheme): void => {
  const store = useStore((state) => state.setTheme);
  store(theme || null);
};
