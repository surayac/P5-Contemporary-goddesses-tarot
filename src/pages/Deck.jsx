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

  const [cardWidth, setCardWidth] = useState(60);
  const [cardOverlap, setCardOverlap] = useState(30); // porcentaje inicial

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        setCards(data.sort(() => Math.random() - 0.5));
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };
    fetchCards();
  }, []);

  // Ajustar tamaño de carta y overlap para que quepan 11 cartas con 50% superposición
  useEffect(() => {
    const updateCardSizes = () => {
      const maxWidth = window.innerWidth;
      const numberOfCards = 11;
      const overlapFactor = 0.5; // 50% superposición
      const width = maxWidth / (numberOfCards - overlapFactor);
      setCardWidth(width);
      setCardOverlap(width * overlapFactor);
    };

    updateCardSizes();
    window.addEventListener("resize", updateCardSizes);
    return () => window.removeEventListener("resize", updateCardSizes);
  }, []);

  const handleCardClick = (card) => {
    if (selectedCards.find((c) => c.id === card.id) || selectedCards.length >= 3) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 3) {
      localStorage.setItem("selectedCards", JSON.stringify(newSelected));
      setTimeout(() => navigate("/cards"), 500);
    }
  };

  const renderRow = (cardsSlice, marginTop = 0) => {
    return (
      <section
        className="flex justify-center relative"
        style={{ marginTop: `${marginTop}px` }}
      >
        {cardsSlice.map((card, index) => {
          const isSelected = selectedCards.find((c) => c.id === card.id);
          return (
            <article
              key={card.id || index}
              className={`transition-transform duration-200 cursor-pointer ${
                isSelected
                  ? "-translate-y-4 md:-translate-y-6"
                  : "hover:-translate-y-1 md:hover:-translate-y-2 hover:z-20 focus-within:-translate-y-1"
              }`}
              style={{
                width: `${cardWidth}px`,
                marginLeft: index === 0 ? 0 : `-${cardOverlap}px`,
                zIndex: isSelected ? 30 : index,
              }}
              onClick={() => handleCardClick(card)}
            >
              <Card card={card} />
            </article>
          );
        })}
      </section>
    );
  };

  if (!cards || cards.length < 22) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading cards...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <section className="flex justify-between w-full mb-18 md:mb-24">
        <p className="text-white text-lg md:text-xl">¡Hola <ShowName />!</p>
        <p className="text-lg md:text-xl"><DateTime /></p>
      </section>

      <h1 className="text-3xl md:text-4xl lg:text-5xl text-starDust text-center mb-10">
        ESCOGE <br className="md:hidden" /> TRES CARTAS
      </h1>

      {/* Fila 1 */}
      {renderRow(cards.slice(0, 11), 0)}
      {/* Fila 2, separada */}
      {renderRow(cards.slice(11, 22), cardWidth * 1.2)}
    </main>
  );
};

export default Deck;
