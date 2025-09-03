import React, { useEffect, useState } from "react";
import { getHistory, clearAllHistory } from "../services/ApiHistory";
import { getAllCards } from "../services/ApiCards";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const History = () => {
  const [history, setHistory] = useState([]);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const historyData = await getHistory();
      const cardsData = await getAllCards();
      setHistory(historyData);
      setCards(cardsData);
    };
    fetchData();
  }, []);


  const getCardById = (id) => cards.find((card) => card.id === id);

  const handleClearHistory = () => {
    toast((t) => (
      <div className="flex flex-col gap-2"
        style={{
          backgroundImage: 'url("src/assets/images/Background.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          border: '5px solid rgba(255,255,255,0.5)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}>
        <p className="p-3">¿Estás seguro que deseas borrar el historial?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={async () => {
              await clearAllHistory();
              setHistory([]);
              toast.dismiss(t.id);
              toast.success("Historial borrado!");
            }}
            className="h-8 p-2 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] cursor-pointer"
          >
            Sí, borrar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="h-8 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    ),
      {
        duration: Infinity,
        style: {
          background: 'transparent',
        }
      });
  };


  if (history.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-white text-2xl mb-6">No hay lecturas guardadas aún.</p>
        <button
          onClick={() => navigate("/deck")}
          className="h-10 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black"
        >
          Nueva Lectura
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-center mb-10">Historial de Lecturas</h1>

      <section className="flex flex-col gap-8">
        {history.map((entry) => {
          const date = new Date(entry.createdAt).toLocaleString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });

          const selectedCards = entry.cards
            .map((id) => getCardById(id))
            .filter(Boolean);

          return (
            <div
              key={entry.id}
              className="grid grid-cols-1 md:grid-cols-[200px_200px_1fr] items-center gap-6 bg-[#6E76AC] p-6 rounded-lg shadow-lg"
            >
              <div className="text-sm text-center md:text-left font-semibold">
                <p>{date}</p>
              </div>

              <div className="flex justify-center gap-2">
                {selectedCards.map((card) => (
                  <img
                    key={card.id}
                    src={card.arcaneImage.imageSrc}
                    alt={card.arcaneName}
                    className="w-16 h-24 object-cover rounded shadow"
                  />
                ))}
              </div>

              <div className="bg-indigo-900 p-4 rounded text-sm">
                {selectedCards.map((card) => (
                  <div key={card.id} className="mb-2">
                    <h3 className="font-bold">{card.arcaneName}</h3>
                    <p className="italic">{card.goddessName}</p>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </section>

      <section className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <button
          onClick={() => navigate("/deck")}
          className="h-10 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black"
        >
          Nueva Lectura
        </button>
        <button
          onClick={handleClearHistory}
          className="h-10 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black"
        >
          Borrar Historial
        </button>
      </section>
    </main>
  );
};

export default History;
