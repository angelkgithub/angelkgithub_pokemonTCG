'use client';

/**
 * SkeletonLoader Component
 * 
 * Displays animated skeleton placeholders while cards are loading.
 * - 15 cards per page (5 columns × 3 rows)
 * - Matches CardItem dimensions and styling
 * - Smooth pulse animation
 */
export default function SkeletonLoader({ count = 15 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="group h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg"
        >
          {/* Image Skeleton */}
          <div className="relative h-1/2 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse" />

          {/* Content Skeleton */}
          <div className="p-4 flex flex-col gap-3 bg-slate-800/50">
            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-slate-600 rounded-lg animate-pulse w-3/4" />
              <div className="h-3 bg-slate-600 rounded-lg animate-pulse w-1/2" />
            </div>

            {/* Info Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-slate-600 rounded-lg animate-pulse w-2/3" />
              <div className="h-3 bg-slate-600 rounded-lg animate-pulse w-1/2" />
            </div>

            {/* Footer Skeleton */}
            <div className="mt-auto pt-2 border-t border-slate-700/50">
              <div className="h-3 bg-slate-600 rounded-lg animate-pulse w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
