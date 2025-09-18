import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Card.css";

const Card = () => {
    const [doses, setDoses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTodayDoses();
    }, []);

    const fetchTodayDoses = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/doses/users/1/today');
            const sortedDoses = response.data.sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime));
            setDoses(sortedDoses);
        } catch (err) {
            setError("No se pudieron cargar las dosis de hoy.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleDose = async (doseId, isCurrentlyTaken) => {
        try {
            await axios.put(`http://localhost:8080/api/doses/${doseId}/toggle`);
            setDoses(doses.map(d => d.doseId === doseId ? { ...d, isTaken: !d.isTaken } : d));
            if (!isCurrentlyTaken) toast.success("Dosis marcada como tomada.");
        } catch (err) {
            toast.error("No se pudo actualizar la toma.");
        }
    };
    
    const formatTime = (dateTimeString) => new Date(dateTimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formatFrequency = (value, unit) => {
        const unitMap = { "HOURLY": "horas", "DAILY": "días", "WEEKLY": "semanas" };
        return `Cada ${value} ${unitMap[unit] || unit.toLowerCase()}`;
    };

    if (loading) return <div>Cargando tu agenda de hoy...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <main className="main">
            <section className="cardsSection">
                {doses.length > 0 ? (
                    doses.map((dose) => (
                        <div key={dose.doseId} className={`card ${dose.isTaken ? "taken" : ""}`}>
                            <div className="card-header">
                                <span className="card-time">{formatTime(dose.scheduledDateTime)}</span>
                                <h2 className="card-title">{dose.medicationName}</h2>
                            </div>
                            <div className="card-details">
                                {dose.reminderMessage && <p className="detail-item"><strong>Notas:</strong> {dose.reminderMessage}</p>}
                                <p className="detail-item"><strong>Frecuencia:</strong> {formatFrequency(dose.frequencyValue, dose.frequencyUnit)}</p>
                                <p className="detail-item"><strong>Inicio:</strong> {formatDate(dose.startDate)}</p>
                                {dose.endDate && <p className="detail-item"><strong>Fin:</strong> {formatDate(dose.endDate)}</p>}
                            </div>
                            <button
                                className={`checkButton ${dose.isTaken ? "checked" : ""}`}
                                onClick={() => handleToggleDose(dose.doseId, dose.isTaken)}
                            >
                                {dose.isTaken && "✔"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>¡Felicidades! No tienes más tomas programadas para hoy.</p>
                )}
            </section>
        </main>
    );
};

export default Card;