import { RefObject, useEffect } from 'react';

type UseOutsideClickHook = {
  ref: RefObject<HTMLElement>;
  onFocus?: () => void;
  onBlur?: () => void;
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideClick = ({ ref, onFocus, onBlur }: UseOutsideClickHook): void => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (typeof onBlur === 'function') {
          onBlur();
        }
      } else if (typeof onFocus === 'function') {
        onFocus();
      }
    };

    /**
     * Bind the event listener
     */
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      /**
       * Unbind the event listener on clean up
       */
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur, onFocus, ref]);
};

export default useOutsideClick;
