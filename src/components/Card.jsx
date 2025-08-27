import React, { useState } from "react";
import backImage from "../assets/card.png";

const Card = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(true);
  };

  return (
    <div onClick={handleClick} className="card">
      <img
        src={flipped ? card.image : backImage}
        alt={flipped ? card.name : "Card back"}
        className="card-image"
      />
    </div>
  );
};

export default Card;
