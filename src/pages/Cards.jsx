import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "../components/DateTime";
import ShowName from "../components/ShowName";


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


            <section className="flex flex-col md:flex-row gap-8 mb-10">
                <section className="text-center">
                    <h2 className="text-lg mb-2">Pasado</h2>
                    <img
                        src={past.arcaneImage.imageSrc}
                        alt={past.arcaneName}
                        className="w-40 mx-auto rounded-lg shadow-lg"
                    />
                    <p className="mt-2">{past.arcaneName}</p>
                </section>

                <section className="text-center">
                    <h2 className="text-lg mb-2">Presente</h2>
                    <img
                        src={present.arcaneImage.imageSrc}
                        alt={present.arcaneName}
                        className="w-40 mx-auto rounded-lg shadow-lg"
                    />
                    <p className="mt-2">{present.arcaneName}</p>
                </section>

                <section className="text-center">
                    <h2 className="text-lg mb-2">Futuro</h2>
                    <img
                        src={future.arcaneImage.imageSrc}
                        alt={future.arcaneName}
                        className="w-40 mx-auto rounded-lg shadow-lg"
                    />
                    <p className="mt-2">{future.arcaneName}</p>
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
                <button
                    onClick={() => navigate("/history", { state })}
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
                >
                    Ver tu historial
                </button>
            </section>
        </main>
    );
};

export default Cards;
