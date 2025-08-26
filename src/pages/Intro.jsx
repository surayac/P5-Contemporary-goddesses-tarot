export default function Intro() {
  return (
    <main className="min-h-screen bg-[#141540] flex items-center justify-center px-6">
      <section className="text-center w-full">
        <h1 className="font-metamorphous text-[32px] md:text-5xl text-[#FFDBB7] drop-shadow-[0_0_8px_#FFDBB7]">
          ORÁCULO DE LAS DIOSAS
        </h1>

        <p
          className="font-merriweather text-[18px] md:text-[20px] text-[#FFDBB7] leading-relaxed text-center mx-auto mt-20"
          style={{ maxWidth: "700px" }}
        >
          Este es el oráculo de las brujas contemporáneas. Elige tres cartas: una
          que habla de las señales de tu pasado, la central que habla de tu
          presente y la final que te dirá qué esperar del futuro. Cada arcano
          mayor se manifiesta a través de una mujer del ámbito STEM, elegida como
          referente y símbolo de inspiración. Esta experiencia une el lenguaje
          del tarot con la memoria de quienes transformaron la ciencia y la
          tecnología. La intención es sembrar curiosidad, aprendizaje y
          reconocimiento hacia estas figuras.
        </p>
      </section>
    </main>
  );
}