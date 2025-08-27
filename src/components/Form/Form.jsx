import React, { useState } from "react";

export default function from(){
    const [nombre, setNombre] = useState ("")
    return (
    <>
        <form>
            <label htmlfor="nombre"></label>
            <input
             type= "text" 
             id= "nombre"
             name="nombre"
             value= {nombre}
             onChange={(e) => setNombre(e.target.value)}/>
        
        </form>
    </>    
    );
}