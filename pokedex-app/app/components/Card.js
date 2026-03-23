
import React from "react";

function PokemonCard({ card }) {

if (!card) return null;

return (
<div className="card">

<img src={card.images?.small} alt={card.name} />

<h3>{card.name}</h3>

<p>HP: {card.hp || "N/A"}</p>

<p>{card.types?.join(", ") || "Unknown"}</p>

</div>
);

}

export default PokemonCard;
