import React from "react";
import { useEffect, useState } from "react";

const ShowName = () => {
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem('playerName');
        setPlayerName(storedName || 'input name');
    }, []);

    return (
        <span>{playerName}</span>
    );
};

export default ShowName;