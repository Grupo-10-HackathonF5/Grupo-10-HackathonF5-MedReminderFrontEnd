import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calendar.css';

const Calendar = () => {
  const [pastDoses, setPastDoses] = useState([]);
  const [futureDoses, setFutureDoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayDoses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/doses/users/1/today');
        
        const now = new Date();
        const past = [];
        const future = [];

        response.data.forEach(dose => {
          const doseTime = new Date(dose.scheduledDateTime);
          if (doseTime < now) {
            past.push(dose);
          } else {
            future.push(dose);
          }
        });

        setPastDoses(past.sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime)));
        setFutureDoses(future.sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime)));
        
      } catch (apiError) {
        setError("No se pudo cargar la agenda.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodayDoses();
  }, []);

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  if (loading) return <p>Cargando tu agenda...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Función auxiliar para no repetir código JSX
  const renderDoseCard = (dose) => (
    <div key={dose.doseId} className={`dose-card ${new Date(dose.scheduledDateTime) < new Date() ? 'past-dose' : 'future-dose'}`}>
      <div className="dose-info">
        <span className="dose-time">{formatTime(dose.scheduledDateTime)}</span>
        <span className="dose-name">{dose.medicationName}</span>
      </div>
      <div className="dose-status">
        <span>{dose.isTaken ? "✅ Tomada" : "⚪️ Pendiente"}</span>
      </div>
    </div>
  );

  return (
    <div className="agenda-container">
      <h2>Tu Agenda Diaria</h2>
      
      <h3>Dosis Pasadas</h3>
      {pastDoses.length > 0 ? (
        pastDoses.map(renderDoseCard)
      ) : (
        <p>No tienes dosis pasadas para hoy.</p>
      )}

      <h3>Dosis Pendientes</h3>
      {futureDoses.length > 0 ? (
        futureDoses.map(renderDoseCard)
      ) : (
        <p>¡Felicidades! No tienes más tomas pendientes por hoy.</p>
      )}
    </div>
  );
};

export default Calendar;