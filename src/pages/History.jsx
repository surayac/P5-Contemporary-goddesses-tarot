import React, { useEffect, useState } from "react";
import { getHistory, clearAllHistory, deleteHistory, updateHistoryName } from "../services/ApiHistory";
import { getAllCards } from "../services/ApiCards";
import { useNavigate } from "react-router-dom";
import ShowName from "../components/ShowName";
import CustomToast from "../components/CustomToast";

const History = () => {
  const [history, setHistory] = useState([]);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

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
    CustomToast.confirm({
      message: "¿Estás seguro que deseas borrar el historial?",
      onConfirm: async () => {
        await clearAllHistory();
        setHistory([]);
        CustomToast.success("Historial borrado!");
      },
    });
  };

  const handleDeleteOne = (id) => {
    const prev = history;

    CustomToast.confirm({
      message: "¿Seguro que quieres borrar esta lectura?",
      onConfirm: async () => {
        setDeletingId(id);
        setHistory((list) => list.filter((h) => h.id !== id));

        try {
          const success = await deleteHistory(id);
          if (!success) throw new Error("Fallo al borrar");
          CustomToast.success("Lectura borrada!");
        } catch (e) {
          console.error(e);
          CustomToast.error("Hubo un problema al borrar. Se restaurará la lista.");
          setHistory(prev);
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const startEditing = (id, currentName) => {
    setEditingId(id);
    setEditedName(currentName);
  };

  const handleSaveName = async (id) => {
    if (!editedName.trim()) return;

    try {
      await updateHistoryName(id, editedName);

      setHistory(prev =>
        prev.map(entry => entry.id === id ? { ...entry, userName: editedName } : entry)
      );

      setEditingId(null);
      setEditedName("");
      CustomToast.success("Nombre actualizado!");
    } catch (err) {
      console.error(err);
      CustomToast.error("No se pudo actualizar el nombre.");
    }
  };

  if (history.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-white text-2xl mb-6">No hay lecturas guardadas aún.</p>
        <button
          onClick={() => navigate("/deck")}
          className="h-10 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer"
        >
          Nueva Lectura
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-center mb-10">
        ¡Hola, <ShowName />!
      </h1>

      <h2 className="text-2xl font-bold text-center mb-10">Tu historial de lecturas</h2>

      <section className="flex flex-col gap-8">
        {history.map((entry) => {
          const date = new Date(entry.createdAt).toLocaleString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          const selectedCards = (entry.cards || []).map((id) => getCardById(id)).filter(Boolean);

          return (
            <section key={entry.id} className="grid grid-cols-1 md:grid-cols-[120px_auto_1.5fr_100px] items-center gap-2 p-4">
              <div className="text-sm text-center md:text-center font-semibold">
                <p>{date}</p>
                {editingId === entry.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={() => handleSaveName(entry.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName(entry.id)}
                    className= "w-30 px-2 py-1 rounded bg-[#7B88B0]/60 text-white placeholder:text-white text-center text-sm"
                    autoFocus
                  />
                ) : (
                  <p
                    className="text-s text-gray-300 mt-1 cursor-pointer hover:underline"
                    onClick={() => startEditing(entry.id, entry.userName)}
                  >
                    {entry.userName}
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-2">
                {selectedCards.map((card) => (
                  <img
                    key={card.id ?? card._id}
                    src={card.arcaneImage.imageSrc}
                    alt={card.arcaneName}
                    className="w-30 h-50 object-cover rounded shadow"
                  />
                ))}
              </div>

              <div className="bg-[#1C195C] p-4 rounded-lg text-sm">
                {selectedCards.map((card) => (
                  <div key={card.id ?? card._id} className="mb-2">
                    <h3 className="font-bold">{card.arcaneName}</h3>
                    <p className="italic">{card.goddessName}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleDeleteOne(entry.id)}
                  disabled={deletingId === entry.id}
                  className={`h-8 px-4 rounded-xl border border-black
                    ${deletingId === entry.id
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "text-black text-sm hover:text-white bg-[#FFDBB7] hover:bg-[#6E76AC] cursor-pointer"
                    }`}
                >
                  {deletingId === entry.id ? "Borrando…" : "Borrar"}
                </button>
              </div>
            </section>
          );
        })}
      </section>

      <section className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <button
          onClick={() => navigate("/deck")}
          className="h-10 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer"
        >
          Nueva Lectura
        </button>
        <button
          onClick={handleClearHistory}
          className="h-10 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer"
        >
          Borrar Historial
        </button>
      </section>
    </main>
  );
};

export default History;