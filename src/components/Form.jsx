
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function Form({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Por favor, ingresa tu nombre.");
      return;
    }

    const today = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const newUser = { name, date: today };
    localStorage.setItem("name", name);

    if (onSubmit) {
      onSubmit(newUser);
    }

    setName("");
  };

  return (
    <section className="max-w-md mx-auto rounded-2xl ">
      <form onSubmit={handleSubmit} className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label htmlFor="name"></label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ fontFamily: "var(--font-merriweather)" }}
            className="w-80 h-12 px-4 rounded-xl bg-[#7B88B0]/70 text-black placeholder:text-black text-center text-l"
            placeholder="Ingresar nombre"
          />

          <button
            type="submit"
            className="h-12 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-l w-auto"
          >
            ¡Comenzar!
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;

