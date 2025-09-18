import React, { useState } from "react";
import toast from "react-hot-toast";
import "./Card.css";

const Card = () => {
    const [taken, setTaken] = useState(false);

    const toggleTaken = () => {
        if (!taken) {
            toast.success("Has tomado tu medicamento");
        }
        setTaken(!taken);
    };
    
    return (
        <main className="main">
            <section className="greetingSection">
                <p className="text">¡Hola Usuario!</p>
                <p className="text">Fecha</p>
            </section>


            <section className="cardsSection">
                <div className="card">
                    <h2 className="cardTitle">Medicamento  500mg</h2>
                    <button className={`checkButton ${taken ? 'checked' : ' '}`}
                        onClick={toggleTaken}>{taken && "✔"}</button>
                </div>


            </section>
        </main>
    );
};


export default Card;