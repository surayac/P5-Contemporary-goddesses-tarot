import React from "react";
import { useEffect, useState } from "react";

const ShowName = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        setName(storedName || 'input name');
    }, []);

    return (
        <span>{name}</span>
    );
};

export default ShowName;