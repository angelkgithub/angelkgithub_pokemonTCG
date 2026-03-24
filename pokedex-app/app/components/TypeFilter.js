'use client';

/**
 * TypeFilter Component
 * 
 * Displays Pokémon type filter buttons with unique colors for each type.
 * Each type is color-coded based on official Pokémon type colors.
 */

// Export color map for use in other components (e.g., CardItem badges)
export const TYPE_COLOR_MAP = {
  'Normal': { bg: 'bg-gray-400', bgHover: 'hover:bg-gray-500', badge: 'bg-gray-400/80' },
  'Fire': { bg: 'bg-red-500', bgHover: 'hover:bg-red-600', badge: 'bg-red-500/80' },
  'Water': { bg: 'bg-blue-500', bgHover: 'hover:bg-blue-600', badge: 'bg-blue-500/80' },
  'Electric': { bg: 'bg-yellow-400', bgHover: 'hover:bg-yellow-500', badge: 'bg-yellow-400/80' },
  'Grass': { bg: 'bg-green-500', bgHover: 'hover:bg-green-600', badge: 'bg-green-500/80' },
  'Ice': { bg: 'bg-cyan-400', bgHover: 'hover:bg-cyan-500', badge: 'bg-cyan-400/80' },
  'Fighting': { bg: 'bg-orange-700', bgHover: 'hover:bg-orange-800', badge: 'bg-orange-700/80' },
  'Poison': { bg: 'bg-purple-600', bgHover: 'hover:bg-purple-700', badge: 'bg-purple-600/80' },
  'Ground': { bg: 'bg-yellow-700', bgHover: 'hover:bg-yellow-800', badge: 'bg-yellow-700/80' },
  'Flying': { bg: 'bg-blue-400', bgHover: 'hover:bg-blue-500', badge: 'bg-blue-400/80' },
  'Psychic': { bg: 'bg-pink-500', bgHover: 'hover:bg-pink-600', badge: 'bg-pink-500/80' },
  'Bug': { bg: 'bg-lime-500', bgHover: 'hover:bg-lime-600', badge: 'bg-lime-500/80' },
  'Rock': { bg: 'bg-gray-600', bgHover: 'hover:bg-gray-700', badge: 'bg-gray-600/80' },
  'Ghost': { bg: 'bg-indigo-600', bgHover: 'hover:bg-indigo-700', badge: 'bg-indigo-600/80' },
  'Dragon': { bg: 'bg-indigo-500', bgHover: 'hover:bg-indigo-600', badge: 'bg-indigo-500/80' },
  'Dark': { bg: 'bg-gray-800', bgHover: 'hover:bg-gray-900', badge: 'bg-gray-800/80' },
  'Steel': { bg: 'bg-slate-400', bgHover: 'hover:bg-slate-500', badge: 'bg-slate-400/80' },
  'Fairy': { bg: 'bg-pink-300', bgHover: 'hover:bg-pink-400', badge: 'bg-pink-300/80' },
};

const POKEMON_TYPES = Object.keys(TYPE_COLOR_MAP).map((name) => ({
  name,
  color: `${TYPE_COLOR_MAP[name].bg} ${TYPE_COLOR_MAP[name].bgHover}`,
}));

export default function TypeFilter({ selectedType, onTypeChange }) {
  const getTypeColor = (typeName) => {
    const type = POKEMON_TYPES.find((t) => t.name === typeName);
    return type ? type.color : 'bg-gray-300 hover:bg-gray-400';
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">Filter by Type</h3>
      
      <div className="flex flex-wrap gap-2">
        {/* All Types Button */}
        <button
          onClick={() => onTypeChange('')}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
            selectedType === ''
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
          }`}
        >
          All Types
        </button>

        {/* Type Buttons */}
        {POKEMON_TYPES.map((type) => (
          <button
            key={type.name}
            onClick={() => onTypeChange(type.name)}
            className={`px-4 py-2 rounded-full font-medium text-sm text-white transition-all duration-300 ${
              selectedType === type.name
                ? `${type.color} shadow-lg scale-105`
                : `${type.color} opacity-75 hover:opacity-100`
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
}
