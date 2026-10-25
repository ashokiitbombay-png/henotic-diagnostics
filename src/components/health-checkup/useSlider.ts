'use client';

import { useEffect, useState } from 'react';

/** Cards visible per slide: 1 (<640px), 2 (<1024px), 3 otherwise. SSR default = 3. */
export function useCardsPerView(): number {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return perView;
}

/** Calls `tick` every `ms` while `enabled` and the user has not requested reduced motion. */
export function useAutoplay(enabled: boolean, ms: number, tick: () => void) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(tick, ms);
    return () => window.clearInterval(id);
  }, [enabled, ms, tick]);
}
