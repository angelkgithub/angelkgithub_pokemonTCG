'use client';

/**
 * Pagination Component
 * 
 * Controls page navigation with:
 * - Previous/Next buttons
 * - Page number indicator
 * - Scroll to top on page change
 * - Prevents unnecessary requests via RTK caching
 */
export default function Pagination({
  currentPage,
  totalCards,
  cardsPerPage,
  onPageChange,
  isLoading,
}) {
  // Calculate total pages
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  
  // Disable pagination if loading or only 1 page
  const isDisabled = isLoading || totalPages <= 1;

  // Handle page change with smooth scroll
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || isLoading) return;
    
    onPageChange(newPage);
    
    // Smooth scroll to top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      {/* Stats */}
      <div className="text-sm text-slate-400">
        Page <span className="text-blue-400 font-semibold">{currentPage}</span> of{' '}
        <span className="text-blue-400 font-semibold">{totalPages}</span>
        {' '} • Showing{' '}
        <span className="text-slate-300 font-semibold">
          {(currentPage - 1) * cardsPerPage + 1}
          –{Math.min(currentPage * cardsPerPage, totalCards)}
        </span>
        {' '}of{' '}
        <span className="text-slate-300 font-semibold">{totalCards}</span> cards
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isDisabled}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            currentPage === 1 || isDisabled
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 active:scale-95'
          }`}
        >
          ← Previous
        </button>

        {/* Page Numbers (Desktop only) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* First Page */}
          {currentPage > 2 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                disabled={isDisabled}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                  isDisabled
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                1
              </button>
              {currentPage > 3 && <span className="text-slate-500">...</span>}
            </>
          )}

          {/* Previous Page Number */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isDisabled}
              className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                isDisabled
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current Page */}
          <button
            disabled={true}
            className="w-10 h-10 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            {currentPage}
          </button>

          {/* Next Page Number */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isDisabled}
              className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                isDisabled
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {currentPage + 1}
            </button>
          )}

          {/* Last Page Number */}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span className="text-slate-500">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={isDisabled}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                  isDisabled
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isDisabled}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            currentPage === totalPages || isDisabled
              ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 active:scale-95'
          }`}
        >
          Next →
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Loading page {currentPage}...
        </div>
      )}
    </div>
  );
}
