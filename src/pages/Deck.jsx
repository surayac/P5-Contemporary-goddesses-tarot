import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getAllCards } from "../services/ApiCards";
import DateTime from "../components/DateTime";
import ShowName from "../components/ShowName";


const Deck = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

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

      <section className="flex justify-between w-full mb-18 md:mb-24">
        <p className="text-white text-lg md:text-xl">¡Hola <ShowName/>!</p>
        <p className="text-lg md:text-xl"><DateTime /></p>
      </section>

      <h1 className="text-3xl md:text-4xl lg:text-5xl text-starDust text-center mb-10">ESCOGE <br className="md:hidden" />TRES CARTAS</h1>

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
