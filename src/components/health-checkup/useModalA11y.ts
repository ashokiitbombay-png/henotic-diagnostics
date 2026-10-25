'use client';

import { useEffect, useRef } from 'react';

/**
 * Shared dialog behaviour for drawers / modals on health checkup pages:
 *  - closes on Escape
 *  - locks body scroll while open
 *  - moves focus into the dialog on open and restores it on close
 */
export function useModalA11y<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const containerRef = useRef<T | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);

    const focusTarget = containerRef.current?.querySelector<HTMLElement>('[data-autofocus], button, a[href], input, select, textarea');
    focusTarget?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return containerRef;
}
