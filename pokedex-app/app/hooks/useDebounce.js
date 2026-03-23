'use client';

import { useState, useEffect } from 'react';

/**
 * useDebounce Hook
 * 
 * Debounces search input to prevent excessive API calls.
 * - 300-500ms delay before calling API
 * - Reduces server load
 * - Improves perceived performance
 * 
 * @param {string} value - Input value to debounce
 * @param {number} delay - Debounce delay in milliseconds (default: 400ms)
 * @returns {string} - Debounced value
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timer on value change
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
