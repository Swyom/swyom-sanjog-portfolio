import { useEffect, useRef } from 'react';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

/**
 * Shared overlay behaviour: locks page scroll while open and closes on Escape.
 */
export const useModal = (isOpen: boolean, onClose: () => void) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };

    lockScroll();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
};
