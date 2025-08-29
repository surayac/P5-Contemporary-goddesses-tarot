import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import { getAllCards } from "../services/ApiCards";

const Deck = () => {
  const [cards, setCards] = useState([]);
  const { state } = useLocation();
  const playerName = state?.playerName || "Jugador";
  const lastDate = state?.lastDate;

  useEffect(() => {
    (async () => {
      const data = await getAllCards();
      setCards(data || []);
    })();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-white text-2xl md:text-3xl font-bold">
          Bienvenido, {playerName}!
        </h1>
        {lastDate && (
          <p className="text-[#D3A85D] mt-2">
            Última tirada: <strong>{lastDate}</strong>
          </p>
        )}
      </div>

      <div className="w-full max-w-screen-xl overflow-hidden">
        <div
          className="inline-flex"
          style={{ ["--overlap"]: "clamp(59px, calc(100vw / 24), 88px)" }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id ?? index}
              style={{
                marginLeft: index === 0 ? 0 : "calc(var(--overlap) * -1)",
              }}
              className="
                transition-transform duration-200
                hover:-translate-y-2 hover:z-20 hover:scale-[1.02]
                focus-within:-translate-y-2 focus-within:z-20
              "
            >
              <Card card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deck;

