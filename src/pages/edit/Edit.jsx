import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Edit.css'; // Importamos un nuevo archivo CSS para la edición

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
    <div className="form-container">
      <h1>Editar Medicamento</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del medicamento:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dosageQuantity">Dosis:</label>
          <input
            id="dosageQuantity"
            type="number"
            name="dosageQuantity"
            value={formData.dosageQuantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dosageUnit">Unidad:</label>
          <input
            id="dosageUnit"
            type="text"
            name="dosageUnit"
            value={formData.dosageUnit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notas adicionales:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Guardar Cambios</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Edit;