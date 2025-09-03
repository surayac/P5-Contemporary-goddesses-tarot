import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowName from "../components/ShowName";
import DateTime from "../components/DateTime";
import { addHistory } from "../services/ApiHistory";


const Reading = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const hasSaved = useRef(false); // <- fusible
  const navigate = useNavigate();

  useEffect(() => {
    const storedRaw = localStorage.getItem("selectedCards");
    const stored = storedRaw ? JSON.parse(storedRaw) : null;

    if (stored?.length === 3) setSelectedCards(stored);

    // evita guardar dos veces en StrictMode
    if (!hasSaved.current && stored?.length === 3) {
      hasSaved.current = true;

      const readingToSave = {
        createdAt: new Date().toISOString(),
        cards: stored.map((card) => card.id),
      };

      addHistory(readingToSave)
        .then((res) => console.log("Lectura guardada automáticamente:", res))
        .catch((err) => console.error("Error al guardar la lectura:", err));
    }
  }, []);

    if (selectedCards.length < 3) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
                <p className="text-white text-xl text-center">
                    No has seleccionado ningúna carta todavía.
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

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <section className="flex flex-col md:flex-row justify-between w-full mt-10 mb-10">
                <p className="text-lg md:text-2xl">¡Hola <ShowName/>! </p>
                <p className="text-lg md:text-2xl"><DateTime/></p>
            </section>

            <section className="flex flex-col gap-4 mb-5">
                <h2 className="text-lg text-center md:text-left">Pasado</h2>
                <article className="grid grid-cols-1 md:grid-cols-[180px_180px_700px] gap-6 items-start">
                    <div className="w-40 h-60 overflow-hidden rounded-lg shadow-lg mx-auto md:mx-0">
                        <img
                            src={past.arcaneImage.imageSrc}
                            alt={past.arcaneName}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-40 h-60 overflow-hidden rounded-lg shadow-lg mx-auto md:mx-0">
                        <img
                            src={past.goddessImage.imageSrc}
                            alt={past.goddessName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg">
                        <h3 className="font-bold">{past.arcaneName}</h3>
                        <p className="italic">{past.goddessName}</p>
                        <p className="text-sm mt-2">{past.goddessDescription}</p>
                    </div>
                </article>
            </section>

            <section className="flex flex-col gap-4 mb-5">
                <h2 className="text-lg text-center md:text-left">Presente</h2>
                <article className="grid grid-cols-1 md:grid-cols-[180px_180px_700px] gap-6 items-start">
                    <div className="w-40 h-60 overflow-hidden rounded-lg shadow-lg mx-auto md:mx-0">
                        <img
                            src={present.arcaneImage.imageSrc}
                            alt={present.arcaneName}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-40 h-60 overflow-hidden rounded-lg shadow-lg mx-auto md:mx-0">
                        <img
                            src={present.goddessImage.imageSrc}
                            alt={present.goddessName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg">
                        <h3 className="font-bold">{present.arcaneName}</h3>
                        <p className="italic">{present.goddessName}</p>
                        <p className="text-sm mt-2">{present.goddessDescription}</p>
                    </div>
                </article>
            </section>

            <section className="flex flex-col gap-4 mb-5">
                <h2 className="text-lg text-center md:text-left">Futuro</h2>
                <article className="grid grid-cols-1 md:grid-cols-[180px_180px_700px] gap-6 items-start">
                    <div className="w-40 h-60 overflow-hidden rounded-lg shadow-lg mx-auto md:mx-0">
                        <img
                            src={future.arcaneImage.imageSrc}
                            alt={future.arcaneName}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-40 h-60 overflow-hidden rounded-lg shadow-lg mx-auto md:mx-0">
                        <img
                            src={future.goddessImage.imageSrc}
                            alt={future.goddessName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg">
                        <h3 className="font-bold">{future.arcaneName}</h3>
                        <p className="italic">{future.goddessName}</p>
                        <p className="text-sm mt-2">{future.goddessDescription}</p>
                    </div>
                </article>
            </section>

            <section className="flex flex-col md:flex-row gap-4 mb">
                <button
                    onClick={() => navigate("/deck")}
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
                >
                    Nueva Lectura
                </button>
                <button
                    onClick={() => navigate("/history")}
                    
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
                 >
                    Guardar Lectura
                    </button>


            </section>
        </main>
    );
};

export default Reading;