'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '../RTK/pokemonApi';

/**
 * usePrefetchNextPage Hook
 * 
 * Automatically prefetches the next page of cards when current page loads.
 * - Runs in background, doesn't block UI
 * - Uses RTK Query built-in prefetch
 * - Cache hit on next page click = instant load
 * 
 * @param {number} currentPage - Current page number
 * @param {string} searchQuery - Current search query
 * @param {number} totalCards - Total cards available
 * @param {number} cardsPerPage - Cards per page
 */
export function usePrefetchNextPage(
  currentPage,
  searchQuery,
  totalCards,
  cardsPerPage
) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate if there's a next page
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      // Prefetch next page with slight delay (don't compete with current page load)
      const prefetchTimer = setTimeout(() => {
        dispatch(
          pokemonApi.util.prefetch('getCards', {
            page: nextPage,
            searchQuery,
          })
        );
      }, 1000);

      return () => clearTimeout(prefetchTimer);
    }
  }, [currentPage, searchQuery, totalCards, cardsPerPage, dispatch]);
}
