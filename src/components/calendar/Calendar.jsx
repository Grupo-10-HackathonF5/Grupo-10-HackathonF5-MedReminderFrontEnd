import React, { useEffect, useState } from "react";
import "./Calendar.css";

const Calendar = () => {
    const now = new Date();

    //hice un mock mientras no tengamos la consumación de la API
    const generateMockAppointments = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return [
            {
                id: 1,
                medication: { name: "Paracetamol", dosage: "500mg" },
                scheduledTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
            },
            {
                id: 2,
                medication: { name: "Ibuprofeno", dosage: "200mg" },
                scheduledTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 40),
            },
            {
                id: 3,
                medication: { name: "Vitamina C", dosage: "1000mg" },
                scheduledTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 48),
            },
            {
                id: 4,
                medication: { name: "Vitamina C", dosage: "1000mg" },
                scheduledTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
            },
        ];
    };

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        setAppointments(generateMockAppointments());
    }, []);

    const past = appointments.filter(a => a.scheduledTime < now);
    const future = appointments.filter(a => a.scheduledTime >= now);

    const formatTime = (date) => {
        return date.getHours().toString().padStart(2, "0") + ":" +
            date.getMinutes().toString().padStart(2, "0");
    };

    return (
        <div className="calendarContainer">
            <h2>Tú Agenda Diaria</h2>

            <div className="calendarSection">
                <h3>Dosis Pasadas</h3>
                {past.length === 0 ? <p>Sin dosis pendientes</p> :
                    past.map(a => (
                        <div key={a.id} className="calendarCard past">
                            <span className="time">{formatTime(a.scheduledTime)}</span>
                            <span className="info">{a.medication.name} - {a.medication.dosage}</span>
                        </div>
                    ))
                }
            </div>

            <div className="calendarSection">
                <h3>Dosis Futuras</h3>
                {future.length === 0 ? <p>Sin dosis pendientes</p> :
                    future.map(a => (
                        <div key={a.id} className="calendarCard future">
                            <span className="time">{formatTime(a.scheduledTime)}</span>
                            <span className="info">{a.medication.name} - {a.medication.dosage}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Calendar;
