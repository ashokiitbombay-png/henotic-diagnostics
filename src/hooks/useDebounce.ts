import { useState, useEffect } from 'react';

/**
 * Custom React hook to debounce state transitions.
 * Useful for handling fast user typing inputs (e.g. search bars).
 * 
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 */
export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
