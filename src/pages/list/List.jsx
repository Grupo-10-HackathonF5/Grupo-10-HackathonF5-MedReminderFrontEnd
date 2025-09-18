import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const List = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8080/api/medications/users/1');
        setMedications(response.data);
      } catch (apiError) {
        console.error('Error al cargar los medicamentos:', apiError);
        setError('No se pudieron cargar los medicamentos. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchMedications();
  }, []);

  const handleDelete = async (medicationId, medicationName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${medicationName}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/medications/${medicationId}`);
        setMedications(medications.filter(med => med.id !== medicationId));
        alert(`"${medicationName}" ha sido eliminado.`);
      } catch (deleteError) {
        console.error('Error al eliminar el medicamento:', deleteError);
        alert('No se pudo eliminar el medicamento.');
      }
    }
  };

  if (loading) return <p>Cargando medicamentos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Mis Medicamentos</h1>
      {medications.length === 0 ? (
        <p>No tienes ningún medicamento guardado.</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dosis</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                <td>{med.name}</td>
                <td>{med.dosageQuantity} {med.dosageUnit}</td>
                <td>{med.notes}</td>
                <td>
                  <button onClick={() => handleDelete(med.id, med.name)}>
                    Eliminar
                  </button>

                  <Link to={`/medicamentos/edit/${med.id}`}>
                    <button>Editar</button>
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;