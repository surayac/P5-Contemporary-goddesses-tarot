// src/pages/History.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const HISTORY_API = "http://localhost:3001/history";

  // URL de tu API de cartas
  const CARDS_API = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot";


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await fetch(HISTORY_API);
        if (!res.ok) throw new Error("Error cargando historial");
        const data = await res.json();

        // para cada lectura, traer info de las cartas
        const fullHistory = await Promise.all(
          data.map(async (reading) => {
            const cards = await Promise.all(
              reading.cards.map(async (id) => {
                const cardRes = await fetch(`${CARDS_API}/${id}`);
                return cardRes.json();
              })
            );
            return { ...reading, cards };
          })
        );

        setHistory(fullHistory);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Para borrar una lectura
  const handleDelete = async (id) => {
    try {
      await fetch(`${HISTORY_API}/${id}`, { method: "DELETE" });
      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch {
      alert("Error al borrar la lectura");
    }
  };

  // borrar todo el historial
  const handleClearAll = async () => {
    if (!confirm("¿Seguro que quieres borrar todo el historial?")) return;
    try {
      for (let item of history) {
        await fetch(`${HISTORY_API}/${item.id}`, { method: "DELETE" });
      }
      setHistory([]);
    } catch {
      alert("Error al borrar el historial");
    }
  };

  // formatear fecha
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  if (loading) return <p className="text-center mt-10">Cargando historial...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen px-6 py-10 text-neutral-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Tu Historial de Lecturas
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-lg">No hay lecturas guardadas todavía.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {history.map((reading) => (
            <li
              key={reading.id}
              className="bg-white/10 rounded-xl p-4 shadow-md flex flex-col md:flex-row gap-4"
            >
              <div className="w-full md:w-1/4">
                <p className="font-semibold">{formatDate(reading.createdAt)}</p>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-2/4">
                {reading.cards.map((card) => (
                  <div key={card.id} className="flex gap-3 items-start">
                    <img
                      src={card.goddessImage.imageSrc}
                      alt={card.goddessName}
                      className="w-16 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{card.arcaneName}</p>
                      <p className="text-sm">{card.goddessName}</p>
                      <p className="text-xs opacity-80 mt-1">
                        {card.arcaneDescription.slice(0, 120)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-between md:w-1/4">
                <button
                  onClick={() => handleDelete(reading.id)}
                  className="bg-red-500/70 hover:bg-red-600 text-white py-1 px-3 rounded-md mb-2"
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleClearAll}
            className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg"
          >
            Borrar todo
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-amber-300 hover:bg-amber-400 text-black py-2 px-4 rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}
