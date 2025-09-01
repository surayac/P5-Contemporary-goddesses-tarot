import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import { getAllCards } from "../services/ApiCards";

const Deck = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  const playerName = state?.playerName;
  const lastDate = state?.lastDate || new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        setCards(data.sort(() => Math.random() - 0.5));
      } catch (err) {
        console.error("Error al buscar cartas:", err);
      }
    };
    fetchCards();
  }, []);

  const handleCardClick = (card) => {
    if (selectedCards.find(c => c.id === card.id) || selectedCards.length >= 3) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 3) {
      localStorage.setItem("selectedCards", JSON.stringify(newSelected));
      setTimeout(() => navigate("/cards"), 500);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">

      <section className="flex justify-between w-full mb-8">
        <p className="text-white text-lg md:text-2xl">¡Hola!, {playerName}!</p>
        <p className="text-lg md:text-2xl">{lastDate}</p>
      </section>

      <h1 className="text-4xl md:text-5xl mb-10">Escoge tres cartas</h1>

      <div className="w-full flex justify-center">
        <div
          className="inline-flex relative"
          style={{ ["--overlap"]: "clamp(59px, calc(100vw / 24), 88px)" }}
        >
          {cards.map((card, index) => {
            const isSelected = selectedCards.find(c => c.id === card.id);
            return (
              <div
                key={card.id}
                style={{
                  marginLeft: index === 0 ? 0 : "calc(var(--overlap) * -1)",
                  zIndex: isSelected ? 30 : index,
                }}
                className={`transition-transform duration-200 cursor-pointer ${isSelected
                  ? "-translate-y-10"
                  : "hover:-translate-y-2 hover:z-20 hover:scale-[1.02] focus-within:-translate-y-2 focus-within:z-20"
                  }`}
                onClick={() => handleCardClick(card)}
              >
                <Card
                  card={
                    isSelected
                      ? { ...card, arcaneImage: { ...card.arcaneImage } }
                      : card
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Deck;
