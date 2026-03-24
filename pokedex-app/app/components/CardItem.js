'use client';

import { useState } from 'react';
import { TYPE_COLOR_MAP } from './TypeFilter';

export default function CardItem({ card, onCardClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extract card price/cost from cardmarket data
  const getCardPrice = () => {
    if (card.cardmarket?.prices?.averageSellPrice) {
      return `$${card.cardmarket.prices.averageSellPrice.toFixed(2)}`;
    }
    if (card.cardmarket?.prices?.avg) {
      return `$${card.cardmarket.prices.avg.toFixed(2)}`;
    }
    return 'N/A';
  };

  // Get type color for badge
  const getPrimaryTypeColor = () => {
    if (card.types && card.types.length > 0) {
      const primaryType = card.types[0];
      return TYPE_COLOR_MAP[primaryType]?.badge || 'bg-gray-400/80';
    }
    return 'bg-gray-400/80';
  };

  return (
    <button
      onClick={() => onCardClick(card)}
      className="h-full group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-slate-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-700">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Card Content */}
        <div className="flex flex-col h-full">
          {/* Image Container */}
          <div className="flex-1 bg-slate-900 overflow-hidden relative flex items-center justify-center">
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
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
                <span className={`inline-block px-2.5 py-1 ${getPrimaryTypeColor()} text-white text-xs font-semibold rounded-full backdrop-blur-sm`}>
                  {card.types[0]}
                </span>
              </div>
            )}

          </div>

          {/* Card Info */}
          <div className="p-4 flex flex-col gap-2 bg-slate-800 relative z-20">
            {/* Name */}
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {card.name}
            </h3>

            {/* Card Cost/Price */}
            <div className="flex items-center justify-between">
              {/* Price */}
              <div className="text-xs font-semibold text-green-400">
                {getCardPrice()}
              </div>
              
              {/* Rarity Stars (if available) */}
              {card.rarity && (
                <div className="flex items-center gap-0.5">
                  <span className="text-xs text-yellow-400">★</span>
                  <span className="text-xs text-slate-400">{card.rarity}</span>
                </div>
              )}
            </div>

            {/* Set Info */}
            {card.set?.name && (
              <p className="text-xs text-slate-400 line-clamp-1">
                {card.set.name}
              </p>
            )}
          </div>
        </div>

        {/* Subtle Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl border border-blue-500/20" />
      </div>
    </button>
  );
}
