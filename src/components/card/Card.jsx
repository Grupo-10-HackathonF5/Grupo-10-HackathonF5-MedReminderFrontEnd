import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllMedication } from "../../services/medication"; // Ajusta si tu servicio está en otro archivo
import "./Card.css";

const Card = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [takenStates, setTakenStates] = useState({}); // Guarda si cada medicamento está tomado

    // Cargar medicamentos al montar
    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const data = await getAllMedication(); // Trae todos los medicamentos
                setMedications(data);

                // Inicializar estados de “taken” en false
                const initialTaken = {};
                data.forEach((med) => {
                    initialTaken[med.id] = false;
                });
                setTakenStates(initialTaken);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los medicamentos. ¿El backend está funcionando?");
            } finally {
                setLoading(false);
            }
        };

        fetchMedications();
    }, []);

    // Función para marcar medicamento como tomado
    const toggleTaken = (medId) => {
        setTakenStates((prev) => ({
            ...prev,
            [medId]: !prev[medId],
        }));

        if (!takenStates[medId]) {
            toast.success("Has tomado tu medicamento");
        }
    };

    if (loading) return <div>Cargando medicamentos...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <main className="main">
            <section className="cardsSection">
                {medications.length > 0 ? (
                    medications.map((med) => (
                        <div key={med.id} className="card">
                            <div className="card-info">
                                <h2 className="cardTitle">
                                    {med.name} {med.dosageQuantity}
                                    {med.dosageUnit}
                                </h2>
                                <p>{med.notes || "Sin notas"}</p>
                            </div>
                            <button
                                className={`checkButton ${takenStates[med.id] ? "checked" : ""}`}
                                onClick={() => toggleTaken(med.id)}
                            >
                                {takenStates[med.id] && "✔"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tienes medicamentos registrados.</p>
                )}
            </section>
        </main>
    );
};

export default Card;
