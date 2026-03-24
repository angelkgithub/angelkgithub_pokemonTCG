import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 15 cards per page = 5 columns × 3 rows (optimal grid display)
const CARDS_PER_PAGE = 15;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pokemontcg.io/v2/',
  }),
  endpoints: (builder) => ({
    // Paginated cards with GLOBAL search support
    // ✅ Searches across ALL cards in the API, not just current page
    // ✅ Uses Pokemon TCG API query format: q=name:search*
    // ✅ Supports partial matching (e.g., "char" → charizard, charmeleon)
    getCards: builder.query({
      query: ({ page = 1, searchQuery = '' } = {}) => {
        let url = `cards?pageSize=${CARDS_PER_PAGE}&page=${page}`;
        
        // Build query string for global search
        if (searchQuery && searchQuery.trim()) {
          // Use Pokemon TCG API query syntax: q=name:searchTerm*
          // The asterisk enables partial matching
          // Examples: "charizard" → "name:charizard*"
          //           "char" → "name:char*"
          const queryString = `name:${searchQuery.trim()}*`;
          url += `&q=${encodeURIComponent(queryString)}`;
        }
        
        return url;
      },
      // Serialize to ensure proper caching behavior
      serializeQueryArgs: ({ queryArgs }) => {
        return {
          searchQuery: queryArgs?.searchQuery || '',
          page: queryArgs?.page || 1,
        };
      },
      // Merge results properly
      merge: (currentCache, newItems) => {
        if (newItems.data) {
          return newItems;
        }
        return currentCache;
      },
    }),
    // Prefetch next page for smooth navigation
    getPrefetchCards: builder.query({
      query: ({ page, searchQuery = '' } = {}) => {
        let url = `cards?pageSize=${CARDS_PER_PAGE}&page=${page}`;
        
        // Same query format as getCards for consistency
        if (searchQuery && searchQuery.trim()) {
          const queryString = `name:${searchQuery.trim()}*`;
          url += `&q=${encodeURIComponent(queryString)}`;
        }
        
        return url;
      },
    }),
    getCardById: builder.query({
      query: (id) => `cards/${id}`,
    }),
    getSets: builder.query({
      query: () => 'sets?pageSize=20',
    }),
    getSetById: builder.query({
      query: (id) => `sets/${id}`,
    }),
    getCardsBySet: builder.query({
      query: ({ setId, page = 1 } = {}) => 
        `cards?q=set.id:${setId}&pageSize=${CARDS_PER_PAGE}&page=${page}`,
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetPrefetchCardsQuery,
  useGetCardByIdQuery,
  useGetSetsQuery,
  useGetSetByIdQuery,
  useGetCardsBySetQuery,
} = pokemonApi;

// Export constant for use in components
export { CARDS_PER_PAGE };