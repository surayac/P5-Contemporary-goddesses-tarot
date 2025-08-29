import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCardById } from "../services/ApiCards"; 


const pick = (obj, keys = []) => keys.map(k => obj?.[k]).find(Boolean);


const needsEnrichment = (card) => {
  if (!card) return false;
  
  const hasMeaning =
    pick(card, ["meaning", "description", "message", "keywords", "meaning_past", "pastMeaning"]) != null;
  const hasGoddess =
    pick(card, ["goddess", "woman", "scientist", "figure", "person"]) != null;
  
  return (!!card.id && (!hasMeaning || !hasGoddess));
};


const mergeCard = (local, remote) => ({ ...local, ...remote });

export default function Reading() {
  const { state } = useLocation();
  const navigate = useNavigate();

  
  const {
    past = {
      id: undefined,
      name: "El Loco",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    },
    present = {
      id: undefined,
      name: "La Emperatriz",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
    },
    future = {
      id: undefined,
      name: "El Mago",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    },
    playerName = "Test",
    readingDate = new Date().toLocaleDateString("es-ES"),
  } = state || {};

  const [cards, setCards] = useState({ past, present, future });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");


  const enrichTargets = useMemo(() => {
    const targets = [];
    if (needsEnrichment(past)) targets.push({ slot: "past", id: past.id });
    if (needsEnrichment(present)) targets.push({ slot: "present", id: present.id });
    if (needsEnrichment(future)) targets.push({ slot: "future", id: future.id });
    return targets;
  }, [past, present, future]);

  useEffect(() => {
    // Si ninguna carta necesita ir a la API, no hacemos nada
    if (!enrichTargets.length) return;

    (async () => {
      try {
        setLoading(true);
        const fetched = await Promise.all(
          enrichTargets.map(async ({ slot, id }) => {
            const data = await getCardById(id);
            return { slot, data };
          })
        );

        // Integramos cada respuesta en su slot correspondiente
        setCards((prev) => {
          const next = { ...prev };
          for (const f of fetched) {
            next[f.slot] = mergeCard(prev[f.slot], f.data);
          }
          return next;
        });
      } catch (e) {
        console.error(e);
        setErr("No fue posible completar la información de las cartas.");
      } finally {
        setLoading(false);
      }
    })();
  }, [enrichTargets]);


  const renderCard = (card, roleLabel) => {
    const goddess =
      pick(card, ["goddess", "woman", "scientist", "figure", "person"]) || null;

    
    const meaningPast = pick(card, ["meaning_past", "pastMeaning", "past"]);
    const meaningPresent = pick(card, ["meaning_present", "presentMeaning", "present"]);
    const meaningFuture = pick(card, ["meaning_future", "futureMeaning", "future"]);
    const genericMeaning = pick(card, ["meaning", "description", "message", "keywords"]);

    
    let chosenMeaning = genericMeaning;
    if (roleLabel === "Pasado" && meaningPast) chosenMeaning = meaningPast;
    if (roleLabel === "Presente" && meaningPresent) chosenMeaning = meaningPresent;
    if (roleLabel === "Futuro" && meaningFuture) chosenMeaning = meaningFuture;

    return (
      <article className="bg-[#1f1f50]/70 p-6 rounded-2xl shadow-lg text-center">
        <p className="text-[#ffdbb7] font-semibold mb-2">{roleLabel}</p>
        <img
          src={card.image}
          alt={card.name}
          className="w-36 h-56 mx-auto rounded-lg shadow-md object-cover"
        />
        <h2 className="text-[#ffdbb7] text-xl font-bold mt-3">{card.name}</h2>

        {goddess && (
          <p className="text-white/90 text-sm mt-1">
            <span className="opacity-80">Diosa/Referente:</span> {goddess}
          </p>
        )}

        {chosenMeaning && (
          <p className="text-white/90 text-sm mt-3">{chosenMeaning}</p>
        )}
      </article>
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start text-white px-6 py-10">
      
      <section className="flex flex-col md:flex-row gap-4 md:gap-20 text-center mb-10">
        <h1 className="font-metamorphous text-3xl text-[#FFDBB7]">¡Hola!, {playerName}</h1>
        <p className="font-metamorphous text-3xl text-[#FFDBB7]">Fecha: {readingDate}</p>
      </section>

      
      {loading && (
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[0,1,2].map(i => (
            <div key={i} className="h-80 rounded-2xl bg-[#1f1f50]/50 animate-pulse" />
          ))}
        </div>
      )}
      {!loading && err && (
        <p className="text-red-300 mb-8" role="alert">{err}</p>
      )}

      
      {!loading && !err && (
        <>
          <section className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-10">
            {renderCard(cards.past, "Pasado")}
            {renderCard(cards.present, "Presente")}
            {renderCard(cards.future, "Futuro")}
          </section>

          
          <section className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate(-1)} 
              className="px-6 py-3 rounded-full border border-[#FFDBB7] text-[#FFDBB7]
                         hover:bg-[#5B4B8A] hover:text-white transition"
            >
              ← Volver a la selección
            </button>

            <button
              onClick={() => navigate("/deck")}
              className="px-6 py-3 rounded-full bg-[#FFDBB7] text-black font-semibold
                         hover:bg-[#5D688A] hover:text-white transition"
            >
              Nueva lectura
            </button>

            <button
              onClick={() => navigate("/history", { state: { playerName } })}
              className="px-6 py-3 rounded-full bg-[#FFDBB7] text-black font-semibold
                         hover:bg-[#5D688A] hover:text-white transition"
            >
              Ver tu historial
            </button>
          </section>
        </>
      )}
    </main>
  );
}
