import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {

  const { medicationId } = useParams(); 
 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    dosageQuantity: '',
    dosageUnit: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicationData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/medications/${medicationId}`);
 
        setFormData({
          name: response.data.name,
          dosageQuantity: response.data.dosageQuantity,
          dosageUnit: response.data.dosageUnit,
          notes: response.data.notes || '' 
        });
        setLoading(false);
      } catch (err) {
        setError('No se pudieron cargar los datos del medicamento.');
        setLoading(false);
      }
    };
    fetchMedicationData();
  }, [medicationId]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedMedication = {
      ...formData,
      userId: 1, 
      active: true,
      dosageQuantity: parseInt(formData.dosageQuantity, 10),
    };

    try {
 
      await axios.put(`http://localhost:8080/api/medications/${medicationId}`, updatedMedication);
      alert('¡Medicamento actualizado con éxito!');
 
      navigate('/medicamentos');
    } catch (err) {
      setError('No se pudo actualizar el medicamento.');
      console.error('Error al actualizar:', err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Editar Medicamento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del medicamento:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dosis:</label>
          <input
            type="number"
            name="dosageQuantity"
            value={formData.dosageQuantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div>
          <label>Unidad:</label>
          <input
            type="text"
            name="dosageUnit"
            value={formData.dosageUnit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Notas adicionales:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Edit;