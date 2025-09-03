import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "../components/DateTime";
import ShowName from "../components/ShowName";
import { addHistory } from "../services/ApiHistory";



const Cards = () => {
    const [selectedCards, setSelectedCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("selectedCards"));
        if (stored && stored.length === 3) setSelectedCards(stored);
    }, []);

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
                <p className="text-lg md:text-2xl">¡Hola <ShowName />! </p>
                <p className="text-lg md:text-2xl"><DateTime /></p>
            </section>

            <section className="flex flex-row gap-4">
                <section className="flex flex-col gap-4 mb-5">
                    <h2 className="text-lg text-center md:text-center">Pasado</h2>
                    <article className="flex flex-col items-center gap-4">
                        <div className="w-50 h-80 overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={past.arcaneImage.imageSrc}
                                alt={past.arcaneName}
                                className="w-full h-full"
                            />
                        </div>

                        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg w-full max-w-[300px]">
                            <h3 className="font-bold">{past.arcaneName}</h3>
                            <p className="text-sm mt-2">{past.arcaneDescription}</p>
                        </div>
                    </article>
                </section>

                <section className="flex flex-col gap-4 mb-5">
                    <h2 className="text-lg text-center md:text-center">Presente</h2>
                    <article className="flex flex-col items-center gap-4">
                        <div className="w-50 h-80 overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={present.arcaneImage.imageSrc}
                                alt={present.arcaneName}
                                className="w-full h-full"
                            />
                        </div>

                        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg w-full max-w-[300px]">
                            <h3 className="font-bold">{present.arcaneName}</h3>
                            <p className="text-sm mt-2">{present.arcaneDescription}</p>
                        </div>
                    </article>
                </section>

                <section className="flex flex-col gap-4 mb-5">
                    <h2 className="text-lg text-center md:text-center">Futuro</h2>
                    <article className="flex flex-col items-center gap-4">
                        <div className="w-50 h-80 overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={future.arcaneImage.imageSrc}
                                alt={future.arcaneName}
                                className="w-full h-full"
                            />
                        </div>

                        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg w-full max-w-[300px]">
                            <h3 className="font-bold">{future.arcaneName}</h3>
                            <p className="text-sm mt-2">{future.arcaneDescription}</p>
                        </div>
                    </article>
                </section>
            </section>

            <section className="flex flex-col md:flex-row gap-4 mb">
                <button
                    onClick={() => navigate("/deck")}
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
                >
                    Nueva Lectura
                </button>
                <button
                    onClick={() => navigate("/reading")}
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
                >
                    Qué dicen tus cartas
                </button>
            </section>
        </main>
    );
};

export default Cards;
