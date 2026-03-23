'use client';

import PokemonModal from "./modal";
import React, { useState } from "react";
import { useGetCardsQuery } from "../RTK/pokemonApi";
import PokemonCard from "./Card";

function CardsList() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const { data, isLoading, error } = useGetCardsQuery(
    type ? `${search} type:${type}` : search
  );

  const cards = data?.data || [];

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="🔍 Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Fire">🔥 Fire</option>
          <option value="Water">💧 Water</option>
          <option value="Grass">🌿 Grass</option>
          <option value="Electric">⚡ Electric</option>
          <option value="Psychic">🧠 Psychic</option>
        </select>
      </div>

      {isLoading && (
        <h2 className="text-center py-8 text-lg text-gray-600">Loading...</h2>
      )}
      {error && (
        <h2 className="text-center py-8 text-lg text-red-600">
          Error loading data: {error?.message || 'Unknown error'}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.id} onClick={() => setSelectedCard(card)} className="cursor-pointer">
            <PokemonCard card={card} />
          </div>
        ))}
      </div>

      {selectedCard && (
        <PokemonModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}

export default CardsList;