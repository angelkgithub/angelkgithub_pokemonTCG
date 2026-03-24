'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useGetCardsQuery, CARDS_PER_PAGE } from '../RTK/pokemonApi';
import { useDebounce } from '../hooks/useDebounce';
import { usePrefetchNextPage } from '../hooks/usePrefetchNextPage';
import CardItem from './CardItem';
import CardModal from './CardModal';
import SkeletonLoader from './SkeletonLoader';
import Pagination from './Pagination';
import TypeFilter from './TypeFilter';

/**
 * CardGrid Component - Optimized with Pagination
 * 
 * Performance improvements:
 * ✅ Loads 15 cards per page (not all 40,000+)
 * ✅ Debounced search (400ms) prevents excessive API calls
 * ✅ Prefetches next page for instant navigation
 * ✅ RTK Query caching prevents re-fetching
 * ✅ Memoized filtering for efficient renders
 * ✅ Skeleton loaders for smooth UX
 */
export default function CardGrid() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  // Debounce search to prevent API spam (400ms delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Fetch paginated cards from API
  const { data, isLoading, error, isFetching } = useGetCardsQuery({
    page,
    searchQuery: debouncedSearchTerm,
  });

  // Prefetch next page for smooth navigation
  usePrefetchNextPage(
    page,
    debouncedSearchTerm,
    data?.totalCount || 0,
    CARDS_PER_PAGE
  );

  // Current page cards
  const cards = data?.data || [];
  const totalCount = data?.totalCount || 0;

  // Filter cards by type (client-side, only current page)
  const filteredCards = useMemo(
    () =>
      cards?.filter((card) => {
        const matchesType =
          !selectedType || card.types?.includes(selectedType);
        return matchesType;
      }) || [],
    [cards, selectedType]
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Reset to page 1 when search changes
  const handleSearchChange = (newTerm) => {
    setSearchTerm(newTerm);
    setPage(1);
  };

  // Loading State - Show skeleton loaders
  if (isLoading && !cards.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Pokémon Cards
            </h1>
            <p className="text-gray-400">
              Browse and explore Pokémon trading cards from all sets
            </p>
          </div>

          {/* Search Bar Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse flex-1 max-w-xs" />
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse flex-1 max-w-xs" />
            </div>
          </div>

          {/* Grid Skeleton */}
          <SkeletonLoader count={15} />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/Snorlax.png"
              alt="Snorlax - Error"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Error Loading Cards
          </h2>
          <p className="text-gray-400">
            {error?.message || 'An error occurred while fetching cards.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Pokémon Cards
          </h1>
          <p className="text-gray-400">
            Browse and explore Pokémon trading cards from all sets
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-slate-500 ml-4 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search cards by name..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="mr-4 p-1 hover:bg-slate-700 rounded text-slate-500 hover:text-slate-400 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}

              {/* Debouncing indicator */}
              {searchTerm !== debouncedSearchTerm && (
                <div className="mr-3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              )}
            </div>
          </div>

          {/* Type Filter Component */}
          <TypeFilter selectedType={selectedType} onTypeChange={setSelectedType} />

          {/* Results Info */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Page <span className="text-blue-600 font-semibold">{page}</span> •
              Showing{' '}
              <span className="text-white font-semibold">
                {filteredCards.length}
              </span>{' '}
              of{' '}
              <span className="text-white font-semibold">
                {totalCount}
              </span>{' '}
              cards
            </p>

            {/* Fetching indicator */}
            {isFetching && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                Fetching...
              </div>
            )}
          </div>
        </div>

        {/* Cards Grid or Skeleton during page transition */}
        {isFetching && !cards.length ? (
          <SkeletonLoader count={15} />
        ) : filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredCards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onCardClick={setSelectedCard}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex justify-center">
              <Image
                src="/Snorlax.png"
                alt="Snorlax - No Cards Found"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No Cards Found
            </h2>
            <p className="text-slate-400 text-center max-w-sm">
              Try adjusting your search or filter to find Pokémon cards
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredCards.length > 0 && (
          <Pagination
            currentPage={page}
            totalCards={totalCount}
            cardsPerPage={CARDS_PER_PAGE}
            onPageChange={handlePageChange}
            isLoading={isFetching}
          />
        )}
      </div>

      {/* Card Modal */}
      <CardModal
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}
