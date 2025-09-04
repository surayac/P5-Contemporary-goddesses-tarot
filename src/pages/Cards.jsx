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

    
      <section className="flex flex-col md:flex-row gap-8 w-full justify-center">
        
        <section className="flex flex-row md:flex-col items-center md:items-center text-center gap-4 w-full md:w-auto">
        
          <h2 className="hidden md:block text-lg font-bold">Pasado</h2>
        
          <div className="w-32 h-48 md:w-50 md:h-80 overflow-hidden rounded-lg shadow-lg flex-shrink-0 mx-auto">
            <img
              src={past.arcaneImage.imageSrc}
              alt={past.arcaneName}
              className="w-full h-full object-cover"
            />
          </div>
        
          <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg w-full md:max-w-[300px] text-center">
         
            <h2 className="block md:hidden text-lg font-bold mb-1">Pasado</h2>
            <h3 className="font-semibold">{past.arcaneName}</h3>
            <p className="text-sm mt-2">{past.arcaneDescription}</p>
          </div>
        </section>

       
        <section className="flex flex-row md:flex-col items-center md:items-center text-center gap-4 w-full md:w-auto">
          <h2 className="hidden md:block text-lg font-bold">Presente</h2>
          <div className="w-32 h-48 md:w-50 md:h-80 overflow-hidden rounded-lg shadow-lg flex-shrink-0 mx-auto">
            <img
              src={present.arcaneImage.imageSrc}
              alt={present.arcaneName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg w-full md:max-w-[300px] text-center">
            <h2 className="block md:hidden text-lg font-bold mb-1">Presente</h2>
            <h3 className="font-semibold">{present.arcaneName}</h3>
            <p className="text-sm mt-2">{present.arcaneDescription}</p>
          </div>
        </section>

        <section className="flex flex-row md:flex-col items-center md:items-center text-center gap-4 w-full md:w-auto">
          <h2 className="hidden md:block text-lg font-bold">Futuro</h2>
          <div className="w-32 h-48 md:w-50 md:h-80 overflow-hidden rounded-lg shadow-lg flex-shrink-0 mx-auto">
            <img
              src={future.arcaneImage.imageSrc}
              alt={future.arcaneName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-indigo-950 text-white p-4 rounded-lg shadow-lg w-full md:max-w-[300px] text-center">
            <h2 className="block md:hidden text-lg font-bold mb-1">Futuro</h2>
            <h3 className="font-semibold">{future.arcaneName}</h3>
            <p className="text-sm mt-2">{future.arcaneDescription}</p>
          </div>
        </section>
      </section>

      
      <section className="flex flex-col md:flex-row gap-4 mt-10">
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
