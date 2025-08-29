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
      setCards(data.data || []);
    })();
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-center px-4">
      <section className="flex justify-between items-start w-full mb-8">
        <p className="text-white text-left text-1xl md:text-1xl"> Bienvenido, {playerName}!</p>
        {lastDate && (
          <p className="text-[#D3A85D] text-right text-1xl md:text-1xl">
            Última tirada: {lastDate}</p>
        )}
      </section>

      <section className="text-center mb-6">
        <h1 className="font-metamorphous text-4xl md:text-4xl text-[#FFDBB7] mb-10 mt-15">
          Escoge tres cartas </h1>

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
        <button
          onClick={() => navigate("/cards", { state })}
          className="h-12 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full mt-10 sm:w-auto">"botón para llevar a la pagina de cartas"</button>
      </section>
    </main>
  );
};

export default Deck;

