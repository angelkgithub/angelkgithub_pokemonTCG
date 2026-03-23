import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 15 cards per page = 5 columns × 3 rows (optimal grid display)
const CARDS_PER_PAGE = 15;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pokemontcg.io/v2/',
  }),
  endpoints: (builder) => ({
    // Paginated cards with search support
    getCards: builder.query({
      query: ({ page = 1, searchQuery = '' } = {}) => {
        let url = `cards?pageSize=${CARDS_PER_PAGE}&page=${page}`;
        if (searchQuery) {
          url += `&q=${encodeURIComponent(searchQuery)}`;
        }
        return url;
      },
      // Keep previous data while new data is loading (better UX)
      serializeQueryArgs: ({ queryArgs }) => {
        return {
          searchQuery: queryArgs?.searchQuery || '',
          page: queryArgs?.page || 1,
        };
      },
      merge: (currentCache, newItems) => {
        // Merge paginated results
        if (newItems.data) {
          return newItems;
        }
        return currentCache;
      },
    }),
    // Prefetch next page (called automatically)
    getPrefetchCards: builder.query({
      query: ({ page, searchQuery = '' } = {}) => {
        let url = `cards?pageSize=${CARDS_PER_PAGE}&page=${page}`;
        if (searchQuery) {
          url += `&q=${encodeURIComponent(searchQuery)}`;
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