"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  transform?: (value: T) => T
) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as T;
        const result = transform ? transform(parsed) : parsed;
        setTimeout(() => {
          setValue(result);
          setIsReady(true);
        }, 0);
        return;
      }
    } catch {
      console.error(`Failed to parse ${key} from localStorage`);
    }
    setTimeout(() => setIsReady(true), 0);
  }, [key]); // transform intentionally omitted — must be stable

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isReady]);

  return [value, setValue, isReady] as const;
}
