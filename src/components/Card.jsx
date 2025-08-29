import React, { useState } from "react";
import backImage from "../assets/card.png";

const Card = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped(true)}
      className="
        w-28 h-40 md:w-32 md:h-48
        shrink-0 rounded-xl overflow-hidden
        border border-amber-300 shadow-md
        outline-none focus-visible:ring-2 focus-visible:ring-amber-300
        bg-black/10
      "
      aria-label={flipped ? card.name : "Carta virada"}
    >
      <img
        src={flipped ? card.image : backImage}
        alt={flipped ? card.name : "Card back"}
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = backImage; }}
      />
    </button>
  );
};

export default Card;


