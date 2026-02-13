import { useEffect, useState } from 'react';

const DEFAULT_DELAY_MS = 400;

export function useDebouncedValue<T>(value: T, delayMs: number = DEFAULT_DELAY_MS): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
