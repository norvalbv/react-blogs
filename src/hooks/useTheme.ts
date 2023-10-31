import { DefTheme } from 'types';
import { useStore } from './useStore';

export const useTheme = (theme?: DefTheme): void => {
  useStore((state) => state.setTheme)(theme || null);
};
