import React from "react";

function PokemonModal({ card, onClose }) {

if (!card) return null;

return (
<div className="modal-overlay" onClick={onClose}>

<div className="modal-content" onClick={(e) => e.stopPropagation()}>

<button className="close-btn" onClick={onClose}>✖</button>

<img src={card.images?.large} alt={card.name} />

<h2>{card.name}</h2>

<p><strong>HP:</strong> {card.hp || "N/A"}</p>
<p><strong>Type:</strong> {card.types?.join(", ") || "Unknown"}</p>
<p><strong>Artist:</strong> {card.artist}</p>

</div>

</div>
);

}

export default PokemonModal;