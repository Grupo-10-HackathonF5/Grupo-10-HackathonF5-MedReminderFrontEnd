import React, { useState, useEffect } from 'react';
import { getAllMedications } from '../../services/api'; // Importamos nuestra función
import './List.css'; // Si quieres añadir estilos después

function List() {
  // 1. Estados para guardar los datos, el estado de carga y los errores
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect para llamar a la API cuando el componente se monte
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await getAllMedications();
        setMedications(response.data); // Guardamos los datos en el estado
      } catch (err) {
        setError('No se pudieron cargar los medicamentos. ¿El backend está funcionando?');
        console.error(err);
      } finally {
        setLoading(false); // Dejamos de cargar, tanto si hubo éxito como si hubo error
      }
    };

    fetchMedications();
  }, []); // El array vacío [] significa que se ejecuta solo una vez

  // 3. Renderizado condicional
  if (loading) {
    return <div>Cargando medicamentos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // 4. Renderizado de la lista de medicamentos
  return (
    <div className="medication-list">
      <h1>Mis Medicamentos</h1>
      {medications.length > 0 ? (
        <ul>
          {medications.map((med) => (
            <li key={med.id}>
              <strong>{med.name}</strong> - {med.dosageQuantity} {med.dosageUnit}
              <p>Notas: {med.notes || 'Sin notas'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes medicamentos registrados.</p>
      )}
    </div>
  );
}

export default List;