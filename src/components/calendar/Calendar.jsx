import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calendar.css';

const Calendar = () => {
  const [doses, setDoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayDoses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/doses/users/1/today');
        setDoses(response.data.sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime)));
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

  return (
    <div className="agenda-container">
      <h2>Tu Agenda Diaria</h2>
      {doses.length > 0 ? (
        doses.map(dose => (
          <div key={dose.doseId} className={`dose-card ${new Date(dose.scheduledDateTime) < new Date() ? 'past-dose' : 'future-dose'}`}>
            <div className="dose-info">
              <span className="dose-time">{formatTime(dose.scheduledDateTime)}</span>
              <span className="dose-name">{dose.medicationName}</span>
            </div>
            <div className="dose-status">
              <span>{dose.isTaken ? "✅ Tomada" : "⚪️ Pendiente"}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes dosis programadas para hoy.</p>
      )}
    </div>
  );
};

export default Calendar;