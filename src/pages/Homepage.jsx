import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

export default function Homepage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (newUser) => {
    setUserData(newUser);
    navigate("/deck", { state: { playerName: newUser.name, lastDate: newUser.date } });
  };

  return (
    <main className="min-h-screen flex flex-col items-center ">
      <section className="text-center w-full order-1">
        <h1 className="font-metamorphous text-3xl md:text-4xl lg:text-5xl text-[#FFDBB7] drop-shadow-[0_0_8px_#FFDBB7]">
           EL PORTAL DE <br className="md:hidden" /> LAS ARCANAS
        </h1>
      </section>
      <section className="mt-10 w-full px-4 order-3 md:order-2">
        <div className="bg-[radial-gradient(circle_at_center,_rgba(255,219,183,0.3),_rgba(20,21,64,0.3))] rounded-3xl
            px-5 pt-12 pb-12 md:pt-16 md:pb-16 md:px-12 mx-auto mt-8 max-w-[70%] p-5 space-y-8">
            <p className="font-merriweather text-lg md:text-xl lg:text-2xl text-[#FFDBB7] text-center mb-3">Este es el oráculo de las brujas contemporáneas. </p>
            <p className="font-merriweather text-lg md:text-xl lg:text-2xl text-[#FFDBB7] text-center mb-3">Elige tres cartas: una que habla de las señales de tu pasado, la central que habla de tu presente
            y la final que te dirá qué esperar del futuro. </p>
            <p className="font-merriweather text-lg md:text-xl lg:text-2xl text-[#FFDBB7] text-center mb-3">Cada arcano mayor se manifiesta a través de una mujer del ámbito STEM, elegida como referente y
            símbolo de inspiración. </p>
            <p className="font-merriweather text-lg md:text-xl lg:text-2xl text-[#FFDBB7] text-center mb-3">Esta experiencia une el lenguaje del tarot con la memoria de quienes transformaron la ciencia y la tecnología. La intención
            es sembrar curiosidad, aprendizaje y reconocimiento hacia estas figuras.</p>
            </div>
        
      </section>

      <section className="mt-10 order-2 md:order-3">
        <Form onSubmit={handleSubmit} />
      </section>

      {userData && (
        <section className="text-center mt-10">
          <div className="w-5xl mx-auto bg-[#1f1f50]/50 p-6 shadow-lg">
            <h3 className="text-xl text-[#ffdbb7] sm:text-4xl font-bold mb-4 mt-8">
              ¡Hola, {userData.name}!
            </h3>
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-1xl font-bold mb-4">
              Su última tirada ha sido: <strong>{userData.date}</strong>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

