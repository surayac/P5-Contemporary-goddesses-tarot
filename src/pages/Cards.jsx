import { useLocation, useNavigate } from "react-router-dom";

const Cards = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    /*const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('selectedCards'));
        if (storedCards) {
            setSelectedCards(storedCards);
        }
    }, []);

    /*const { past, present, future, playerName, readingDate } = state || {};

    if (!past || !present || !future) {
        return (
            <p className="text-center text-white mt-10">
                No has seleccionado ningúna carta.
            </p>
        );
} */

    const {
        past = { name: "El Loco", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
        present = { name: "La Emperatriz", image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" },
        future = { name: "El Mago", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
        playerName = "Test",
        readingDate = new Date().toLocaleDateString("es-ES"),
    } = state || {};

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-between px-4 py-20">
            <section className="flex gap-20">
                <p className="text-l text-left md:text-3xl">¡Hola!, {playerName}</p>
                <p className="text-l text-right md:text-3xl">Fecha: {readingDate}</p>
            </section>

            <section className="flex gap-8">
                <section className="text-center">
                    <h2 className="text-l mb-2">Pasado</h2>
                    <img src={past.image} alt={past.name} className="w-50 mx-auto" />
                    <p className="mt-2">{past.name}</p>
                </section>

                <section className="text-center">
                    <h2 className="text-l mb-2">Presente</h2>
                    <img src={present.image} alt={present.name} className="w-50 mx-auto" />
                    <p className="mt-2">{present.name}</p>
                </section>

                <section className="text-center">
                    <h2 className="text-l mb-2">Futuro</h2>
                    <img src={future.image} alt={future.name} className="w-50 mx-auto" />
                    <p className="mt-2">{future.name}</p>
                </section>
            </section>


            <section className="flex flex-col md:flex-row gap-4 mb-6">
                <button
                    onClick={() => navigate("/deck")}
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-l w-full sm:w-auto"
                >
                    Nueva Lectura
                </button>
                <button
                    onClick={() => navigate("/read", { state })}
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-l w-full sm:w-auto"
                >
                    Qué dicen tus cartas
                </button>
                <button
                    onClick={() => navigate("/history", { state })}
                    className="h-10 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] border border-black cursor-pointer text-l w-full sm:w-auto"
                >
                    Ver tu historial
                </button>
            </section>
        </main>
    );
};

export default Cards;
