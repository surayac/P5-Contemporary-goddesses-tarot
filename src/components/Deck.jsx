import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import { getAllCards } from "../services/ApiCards";

const Deck = () => {
  const [cards, setCards] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  const playerName = state?.playerName || "Jugador";
  const lastDate = state?.lastDate || new Date().toLocaleDateString("es-ES");

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await getAllCards();
        setCards(response.data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Error obtaining the cards:", error);
      }
    };
    getCards();
  }, []);

  const handleCardClick = (card) => {
    if (selectedCards.includes(card.id) || selectedCards.length >= 3) return;

    const newSelected = [...selectedCards, card.id];
    setSelectedCards(newSelected);

    if (newSelected.length === 3) {
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      const chosenCards = shuffledCards.filter(c => newSelected.includes(c.id));
      localStorage.setItem('selectedCards', JSON.stringify(chosenCards));

      setTimeout(() => navigate("/cards"), 1000);
    }
  };


  return (
    <main className="min-h-screen flex flex-col justify-center px-4">
      <section className="flex justify-between items-center w-full mb-8">
        <p>Bienvenido, {playerName}!</p>
        {lastDate && (
          <p> {lastDate}</p>
        )}
      </section>

      <section className="text-center mb-6 outline-hidden">
        <h1 className="text-4xl md:text-4xl mb-10 mt-15">
          Escoge tres cartas </h1>

        <div className="w-full">
          <div
            className="inline-flex relative"
            style={{ ["--overlap"]: "clamp(59px, calc(100vw / 24), 88px)" }}
          >
            {cards.map((card, index) => {
              const isSelected = selectedCards.includes(card.id);
              return (
                <div
                  key={card.id ?? index}
                  style={{
                    marginLeft: index === 0 ? 0 : "calc(var(--overlap) * -1)",
                    zIndex: isSelected ? 30 : index,
                  }}
                  className={`
                transition-transform duration-200
                 ${isSelected ? "-translate-y-8" : "hover:-translate-y-2 hover:z-20 hover:scale-[1.02] focus-within:-translate-y-2 focus-within:z-20"}
                  `}
                  onClick={() => handleCardClick(card)}
                >
                  <Card card={isSelected ? { ...card, image: "/src/assets/card.png" } : card} />
                </div>
              )
            })}
          </div>
        </div>

      </section>
    </main>
  );
};

export default Deck;

