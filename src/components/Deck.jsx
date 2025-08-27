import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getAllCards } from "../services/ApiCards";

const Deck = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getAllCards();
      setCards(data);
    };
    fetchCards();
  }, []);

  return (
    <div className="deck">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Deck;
