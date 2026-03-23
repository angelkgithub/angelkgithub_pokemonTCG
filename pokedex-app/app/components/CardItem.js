'use client';

import { useState } from 'react';

export default function CardItem({ card, onCardClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <button
      onClick={() => onCardClick(card)}
      className="h-full group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Card Content */}
        <div className="flex flex-col h-full">
          {/* Image Container */}
          <div className="flex-1 bg-gradient-to-br from-slate-600 to-slate-800 overflow-hidden relative flex items-center justify-center">
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse" />
            )}

            {/* Card Image */}
            {card.images?.small && (
              <img
                src={card.images.small}
                alt={card.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {/* Type Badge */}
            {card.types && card.types.length > 0 && (
              <div className="absolute top-3 right-3 z-20">
                <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                  {card.types[0]}
                </span>
              </div>
            )}

            {/* HP Badge */}
            {card.hp && (
              <div className="absolute top-3 left-3 z-20 text-center">
                <div className="text-xs font-semibold text-slate-300">HP</div>
                <div className="text-lg font-bold text-red-400">{card.hp}</div>
              </div>
            )}
          </div>

          {/* Card Info */}
          <div className="p-4 flex flex-col gap-2 bg-slate-800/50 relative z-20">
            {/* Name */}
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {card.name}
            </h3>

            {/* Set Info */}
            {card.set?.name && (
              <p className="text-xs text-slate-400 line-clamp-1">
                {card.set.name}
              </p>
            )}

            {/* Rarity Stars (if available) */}
            {card.rarity && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-yellow-400">★</span>
                <span className="text-xs text-slate-400">{card.rarity}</span>
              </div>
            )}

            {/* Click Indicator */}
            <div className="mt-auto pt-2 border-t border-slate-700/50">
              <p className="text-xs text-slate-400 group-hover:text-blue-400 transition-colors duration-300">
                Click for details →
              </p>
            </div>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
        </div>
      </div>
    </button>
  );
}
