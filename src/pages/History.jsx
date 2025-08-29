import { useEffect, useState } from "react";
import { useNavigate } from "react - router-dom";

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const HISTORY_API = "http://localhost:3001/history"
    const CARDS_API ='https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/taroot';

    useEffect(()) => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const res = await fetch(HISTORY_API);
                if (!res.ok) throw new Error("Error cargando historial");
                const data = await res.json();

                const fullHistory = await Promise.all(
                    data.map(asyn (reading) => {
                      const cards = await <Promise  
                    })
                )
            }
        }
    }

}