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
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="text-center w-full">
        <h1 className="font-metamorphous text-[32px] md:text-5xl text-[#FFDBB7] drop-shadow-[0_0_8px_#FFDBB7]">
          ORÁCULO DE    <br className="block md:hidden" /> LAS DIOSAS
        </h1>

        <div className="bg-[radial-gradient(circle_at_center,_rgba(255,219,183,0.3),_rgba(20,21,64,0.3))] rounded-3xl
             pt-12 pb-12 px-[15%]  md:pt-16 md:pb-16 md:px-12 mx-auto mt-8 max-w-3xl">
          <p className="font-merriweather-regular text-[18px] md:text-[20px] text-[#FFDBB7] leading-relaxed text-justify">
            Este es el oráculo de las brujas contemporáneas. Elige tres cartas: una que habla de las señales de tu pasado, la central que habla de tu presente
            y la final que te dirá qué esperar del futuro. Cada arcano mayor se manifiesta a través de una mujer del ámbito STEM, elegida como referente y
            símbolo de inspiración. Esta experiencia une el lenguaje del tarot con la memoria de quienes transformaron la ciencia y la tecnología. La intención
            es sembrar curiosidad, aprendizaje y reconocimiento hacia estas figuras.
          </p>
        </div>
      </section>

      <section className="mt-10">
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

