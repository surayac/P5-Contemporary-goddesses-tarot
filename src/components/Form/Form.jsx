
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
        <div className="flex flex sm:flex items-center justify-center gap-4 sm:space-x-6 space-y-6">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#7B88B0] opacity-90 "
            placeholder="Ingresar nombre "
            required
          />

          <button
            type="submit"
            className="rounded-xl text-black hover:text-[#ffffff] bg-[#FFDBB7] hover:bg-[#5D688A] px-6 py-2 cursor-pointer text-xl w-full sm:w-auto"
          >
            ¡Comenzar!
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;

