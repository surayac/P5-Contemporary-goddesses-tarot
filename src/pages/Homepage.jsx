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
  
    <main className="flex flex-col mb-10">
      <section className="order-1 text-center">
        <h1 className="mt-15 font-metamorphous text-3xl md:text-4xl lg:text-5xl text-starDust drop-shadow-[0_0_8px_#FFDBB7]">
           EL PORTAL DE <br className="md:hidden" /> LAS ARCANAS
        </h1>
      </section>
      <section className="sm:!order-2 order-3 mt-5 px-4">
        <div className="bg-[radial-gradient(circle_at_center,_rgba(255,219,183,0.4),_rgba(20,21,64,0.4))] rounded-3xl
            px-5 pt-12 pb-12 md:pt-16 md:pb-16 md:px-12 mx-auto mt-8 max-w-[80%] p-5">
            <div className="text-base md:text-xl lg:text-2xl text-starDust text-center">
            <p className="mb-3">Este es el oráculo de las brujas contemporáneas. </p>
            <p className="mb-3">Elige tres cartas: una que habla de las señales de tu pasado, la central que habla de tu presente
            y la final que te dirá qué esperar del futuro. </p>
            <p className="mb-3">Cada arcano mayor se manifiesta a través de una mujer del ámbito STEM, elegida como referente y
            símbolo de inspiración. </p>
            <p className="mb-3">Esta experiencia une el lenguaje del tarot con la memoria de quienes transformaron la ciencia y la tecnología. La intención
            es sembrar curiosidad, aprendizaje y reconocimiento hacia estas figuras.</p>
            </div>
        </div>  
        
      </section>

      <section className="sm:!order-3 order-2 mt-10 md:mb-10 w-full px-20">
        <Form onSubmit={handleSubmit} />
      </section>
   
    </main>
    
 
  );
}

