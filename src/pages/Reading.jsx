import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowName from "../components/ShowName";
import DateTime from "../components/DateTime";
import { addHistory } from "../services/ApiHistory";
import toast, { Toaster } from "react-hot-toast";

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

                toast((t) => (
                    <div
                        className="flex flex-col gap-3 text-white"
                        style={{
                            backgroundImage: 'url("src/assets/images/Background.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            border: "2px solid rgba(255,255,255,0.5)",
                            borderRadius: "16px",
                            padding: "16px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        }}
                    >
                        <p className="font-semibold text-center">
                            ¡Lectura guardada en el historial!
                        </p>
                        <div className="flex justify-center gap-2 mt-2">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="h-8 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] cursor-pointer"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                ), {
                    duration: Infinity,
                    style: { background: "transparent" },
                });
            })
            .catch((err) => {
                toast.error("Error al guardar la lectura.");
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

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <section className="flex flex-col md:flex-row justify-between w-full mt-10 mb-10">
                <p className="text-lg md:text-2xl">¡Hola <ShowName />!</p>
                <p className="text-lg md:text-2xl"><DateTime /></p>
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