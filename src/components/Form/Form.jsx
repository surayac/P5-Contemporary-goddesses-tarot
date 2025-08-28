
import { useState } from "react";

function Form({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const newUser = { name, date: today };

    if (onSubmit) {
      onSubmit(newUser);
    }

    setName("");
  };

  return (
    <section className="max-w-md mx-auto rounded-2xl shadow-md">
      <form onSubmit={handleSubmit} className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-80 h-12 px-4 rounded-xl bg-[#7B88B0] opacity-80 text-black placeholder:text-black text-xl"
            placeholder="Ingresar nombre"
            required
          />

          <button
            type="submit"
            className="h-12 px-6 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-xl w-full sm:w-auto"
          >
            ¡Comenzar!
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;

