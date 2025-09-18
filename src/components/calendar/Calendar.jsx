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

        setPastDoses(past);
        setFutureDoses(future);
        
      } catch (apiError) {
        console.error("Error al cargar la agenda diaria:", apiError);
        setError("No se pudo cargar la agenda. Inténtalo de nuevo más tarde.");
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

  if (loading) {
    return <p>Cargando tu agenda...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Tu Agenda Diaria</h2>

      {/* Sección de Dosis Pasadas */}
      <h3>Dosis Pasadas</h3>
      {pastDoses.length > 0 ? (
        pastDoses.map(dose => (
          <div key={dose.doseId} style={{ backgroundColor: '#ffdddd', padding: '10px', margin: '5px 0' }}>
 
            <strong>{formatTime(dose.scheduledDateTime)}</strong> - {dose.medicationName}
          </div>
        ))
      ) : (
        <p>No tienes dosis pasadas para hoy.</p>
      )}

      {/* Sección de Dosis Futuras */}
      <h3>Dosis Futuras</h3>
      {futureDoses.length > 0 ? (
        futureDoses.map(dose => (
          <div key={dose.doseId} style={{ backgroundColor: '#ddffdd', padding: '10px', margin: '5px 0' }}>
            <strong>{formatTime(dose.scheduledDateTime)}</strong> - {dose.medicationName}
          </div>
        ))
      ) : (
        <p>No hay tomas futuras para hoy.</p>
      )}
    </div>
  );
};

export default Calendar;