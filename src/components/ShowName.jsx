import { useEffect, useState } from "react";

const ShowName = () => {
    const [playerName, setPlayerName] = useState(localStorage.getItem("playerName") || "Usuario");

    useEffect(() => {
        const handleNameChange = (e) => setPlayerName(e.detail);
        window.addEventListener("playerNameChanged", handleNameChange);

        return () => {
            window.removeEventListener("playerNameChanged", handleNameChange);
        };
    }, []);

    return <span>{playerName}</span>;
};

export default ShowName;