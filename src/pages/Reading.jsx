import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowName from "../components/ShowName";
import DateTime from "../components/DateTime";
import { addHistory } from "../services/ApiHistory";
import CustomToast from "../components/CustomToast";

const Reading = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRaw = localStorage.getItem("selectedCards");
    const stored = storedRaw ? JSON.parse(storedRaw) : null;
    if (stored?.length === 3) {
      setSelectedCards(stored);
    }
  }, []);

  const handleSaveReading = () => {
    if (isSaved) return;

    const userName = localStorage.getItem("name");

    const readingToSave = {
      createdAt: new Date().toISOString(),
      userName: userName || "Usuario Anónimo",
      cards: selectedCards.map((card) => card.id),
    };

    addHistory(readingToSave)
      .then(() => {
        setIsSaved(true);
        CustomToast.success("¡Lectura guardada en el historial!");
      })
      .catch((err) => {
        CustomToast.error("Error al guardar la lectura.");
        console.error(err);
      });
  };

  if (selectedCards.length < 3) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <p className="text-white text-xl text-center">
          No has seleccionado ninguna carta todavía.
        </p>
        <button
          onClick={() => navigate("/deck")}
          className="mt-6 h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black"
        >
          Volver al mazo
        </button>
      </main>
    );
  }

  const [past, present, future] = selectedCards;

  const cardsData = [
    { title: "Pasado", data: past },
    { title: "Presente", data: present },
    { title: "Futuro", data: future },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between w-full max-w-6xl mx-auto mt-10 mb-10">
        <p className="text-lg md:text-2xl">¡Hola <ShowName />!</p>
        <p className="text-lg md:text-2xl"><DateTime /></p>
      </section>

      {/* Secciones para cada carta */}
      {cardsData.map((item, idx) => (
        <section key={idx} className="flex flex-col gap-4 mb-10 w-full max-w-6xl mx-auto">
          <h2 className="text-lg text-center md:text-left">{item.title}</h2>

          {/* Contenedor principal */}
          <article className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Imágenes */}
            <div className="flex flex-row gap-4 justify-center md:flex-row md:flex-none">
              <div className="w-36 h-52 md:w-40 md:h-60 overflow-hidden rounded-lg shadow-lg flex-shrink-0">
                <img
                  src={item.data.arcaneImage.imageSrc}
                  alt={item.data.arcaneName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-36 h-52 md:w-40 md:h-60 overflow-hidden rounded-lg shadow-lg flex-shrink-0">
                <img
                  src={item.data.goddessImage.imageSrc}
                  alt={item.data.goddessName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Texto */}
            <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg flex-1 md:max-w-[60%] text-center md:text-left">
              <h3 className="font-bold">{item.data.arcaneName}</h3>
              <p className="italic">{item.data.goddessName}</p>
              <p className="text-sm mt-2">{item.data.goddessDescription}</p>
            </div>
          </article>
        </section>
      ))}

      {/* Botones */}
      <section className="flex flex-col md:flex-row gap-4 mt-10 w-full max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate("/deck")}
          className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
        >
          Nueva Lectura
        </button>
        <button
          onClick={handleSaveReading}
          className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
          disabled={isSaved}
        >
          {isSaved ? "Lectura Guardada" : "Guardar Lectura"}
        </button>
        <button
          onClick={() => navigate("/history")}
          className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
        >
          Ver tu historial
        </button>
      </section>
    </main>
  );
};

export default Reading;
