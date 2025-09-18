import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css'; // Importamos el archivo de estilos

const List = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/medications/users/1');
        setMedications(response.data);
      } catch (apiError) {
        setError('No se pudieron cargar los medicamentos.');
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
        alert('No se pudo eliminar el medicamento.');
      }
    }
  };

  if (loading) return <p>Cargando medicamentos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="list-container">
      <h1>Mis Medicamentos</h1>
      {medications.length === 0 ? (
        <p>No tienes ningún medicamento guardado.</p>
      ) : (
        <table>
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
                <td>{`${med.dosageQuantity} ${med.dosageUnit}`}</td>
                <td>{med.notes}</td>
                <td className="actions-cell">
                  {/* Botón de Eliminar con su clase */}
                  <button onClick={() => handleDelete(med.id, med.name)} className="delete-btn">
                    Eliminar
                  </button>
                  
                  {/* Botón de Editar con su clase */}
                  <Link to={`/medicamentos/edit/${med.id}`}>
                    <button className="edit-btn"> 
                      Editar
                    </button>
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