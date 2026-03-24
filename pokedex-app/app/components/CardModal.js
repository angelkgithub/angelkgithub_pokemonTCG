'use client';

import { useEffect } from 'react';

export default function CardModal({ card, isOpen, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !card) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div
          className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50 animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-700/50 hover:bg-slate-600 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* Left: Large Image */}
            <div className="flex flex-col gap-4">
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden h-96 flex items-center justify-center">
                {card.images?.large ? (
                  <img
                    src={card.images.large}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 text-center">
                    <p>Image not available</p>
                  </div>
                )}

                {/* Type Badge */}
                {card.types && card.types.length > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full">
                      {card.types.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Set Info Card */}
              {card.set && (
                <div className="bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm border border-slate-600/50">
                  <p className="text-xs text-slate-400 mb-1">Set</p>
                  <p className="text-sm font-semibold text-white">{card.set.name}</p>
                  <p className="text-xs text-slate-400 mt-1">Series: {card.set.series}</p>
                </div>
              )}
            </div>

            {/* Right: Card Info */}
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <h2 className="text-3xl font-bold text-white">{card.name}</h2>
                  {card.hp && (
                    <span className="text-xl font-bold text-red-400">HP {card.hp}</span>
                  )}
                </div>
                {card.evolvesFrom && (
                  <p className="text-sm text-slate-400">Evolves from: {card.evolvesFrom}</p>
                )}
              </div>

              {/* Card Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Rarity */}
                {card.rarity && (
                  <div className="bg-slate-700/50 rounded-lg p-3 backdrop-blur-sm border border-slate-600/50">
                    <p className="text-xs text-slate-400 mb-1">Rarity</p>
                    <p className="text-sm font-semibold text-yellow-400">{card.rarity}</p>
                  </div>
                )}

                {/* Card Number */}
                {card.cardNumber && card.set?.printedTotal && (
                  <div className="bg-slate-700/50 rounded-lg p-3 backdrop-blur-sm border border-slate-600/50">
                    <p className="text-xs text-slate-400 mb-1">Card Number</p>
                    <p className="text-sm font-semibold text-blue-400">
                      {card.cardNumber}/{card.set.printedTotal}
                    </p>
                  </div>
                )}

                {/* Artist */}
                {card.artist && (
                  <div className="bg-slate-700/50 rounded-lg p-3 backdrop-blur-sm border border-slate-600/50 col-span-2">
                    <p className="text-xs text-slate-400 mb-1">Illustrator</p>
                    <p className="text-sm font-semibold text-slate-200">{card.artist}</p>
                  </div>
                )}
              </div>

              {/* Abilities Section */}
              {card.abilities && card.abilities.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 backdrop-blur-sm border border-slate-600/50">
                  <h3 className="font-semibold text-white mb-3">Abilities</h3>
                  <div className="space-y-3">
                    {card.abilities.map((ability, idx) => (
                      <div key={idx} className="pb-3 last:pb-0 last:border-0 border-b border-slate-600/30">
                        <p className="text-xs text-slate-400 mb-1">{ability.type}</p>
                        <p className="text-sm font-medium text-white mb-1">{ability.name}</p>
                        <p className="text-xs text-slate-300">{ability.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attacks Section */}
              {card.attacks && card.attacks.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 backdrop-blur-sm border border-slate-600/50">
                  <h3 className="font-semibold text-white mb-3">Attacks</h3>
                  <div className="space-y-3">
                    {card.attacks.map((attack, idx) => (
                      <div key={idx} className="pb-3 last:pb-0 last:border-0 border-b border-slate-600/30">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-white">{attack.name}</p>
                            {attack.cost && (
                              <div className="flex gap-1">
                                {attack.cost.map((type, i) => (
                                  <span
                                    key={i}
                                    className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white"
                                    title={type}
                                  >
                                    {type.charAt(0).toUpperCase()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {attack.damage && (
                            <span className="text-lg font-bold text-red-400">{attack.damage}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300">{attack.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weaknesses & Resistances */}
              <div className="grid grid-cols-2 gap-3">
                {/* Weaknesses */}
                {card.weaknesses && card.weaknesses.length > 0 && (
                  <div className="bg-slate-700/50 rounded-lg p-3 backdrop-blur-sm border border-slate-600/50">
                    <p className="text-xs text-slate-400 mb-2 font-semibold">Weaknesses</p>
                    <div className="space-y-1">
                      {card.weaknesses.map((weakness, idx) => (
                        <p key={idx} className="text-xs text-red-400">
                          {weakness.type} {weakness.value && `×${weakness.value}`}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resistances */}
                {card.resistances && card.resistances.length > 0 && (
                  <div className="bg-slate-700/50 rounded-lg p-3 backdrop-blur-sm border border-slate-600/50">
                    <p className="text-xs text-slate-400 mb-2 font-semibold">Resistances</p>
                    <div className="space-y-1">
                      {card.resistances.map((resistance, idx) => (
                        <p key={idx} className="text-xs text-green-400">
                          {resistance.type} {resistance.value && `${resistance.value}`}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Retreat Cost */}
              {card.retreatCost && card.retreatCost.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-3 backdrop-blur-sm border border-slate-600/50">
                  <p className="text-xs text-slate-400 mb-2">Retreat Cost</p>
                  <div className="flex gap-1">
                    {card.retreatCost.map((_, idx) => (
                      <span
                        key={idx}
                        className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white"
                      >
                        ●
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
