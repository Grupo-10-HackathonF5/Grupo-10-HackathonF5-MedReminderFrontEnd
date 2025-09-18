import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css'; 

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    dosageQuantity: 1,
    dosageUnit: '',
    notes: '',
    startDate: '',
    endDate: '',
    dayTime: '',
    frequencyValue: 8,
    frequencyUnit: 'HOURLY',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const medicationData = {
        userId: 1,
        name: formData.name,
        dosageQuantity: parseInt(formData.dosageQuantity, 10),
        dosageUnit: formData.dosageUnit,
        active: true,
        notes: formData.notes,
      };
      const medicationResponse = await axios.post('http://localhost:8080/api/medications', medicationData);
      const newMedicationId = medicationResponse.data.id;

      const posologyData = {
        medicationId: newMedicationId,
        userId: 1,
        startDate: formData.startDate,
        endDate: formData.endDate,
        dayTime: `${formData.startDate}T${formData.dayTime}`,
        frequencyValue: parseInt(formData.frequencyValue, 10),
        frequencyUnit: formData.frequencyUnit,
        quantity: parseInt(formData.dosageQuantity, 10),
        reminderMessage: formData.notes,
        dosesNumber: 30,
      };
      await axios.post('http://localhost:8080/api/posologies', posologyData);
      alert('¡Medicamento y horario guardados con éxito!');
      navigate('/medicamentos');
    } catch (apiError) {
      console.error('Ocurrió un error en el proceso de guardado:', apiError);
      setError('No se pudo guardar. Revisa todos los campos y la consola para más detalles.');
    }
  };

  return (
    <div className="form-container">
      <h1>Añadir Nuevo Medicamento y Horario</h1>
      <form onSubmit={handleSubmit}>
        
        <h3>Datos del Medicamento</h3>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="dosageQuantity">Dosis:</label>
          <input id="dosageQuantity" type="number" name="dosageQuantity" value={formData.dosageQuantity} onChange={handleChange} min="1" required />
        </div>
        <div className="form-group">
          <label htmlFor="dosageUnit">Unidad (mg, comprimido, etc.):</label>
          <input id="dosageUnit" type="text" name="dosageUnit" value={formData.dosageUnit} onChange={handleChange} required />
        </div>
        
        <h3>Pauta y Horario</h3>
        <div className="form-group">
          <label htmlFor="startDate">Fecha de Inicio:</label>
          <input id="startDate" type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Fecha de Fin (opcional):</label>
          <input id="endDate" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dayTime">Hora de la primera toma:</label>
          <input id="dayTime" type="time" name="dayTime" value={formData.dayTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="frequencyValue">Frecuencia:</label>
          <div className="frequency-group">
            <input id="frequencyValue" type="number" name="frequencyValue" value={formData.frequencyValue} onChange={handleChange} required />
            <select name="frequencyUnit" value={formData.frequencyUnit} onChange={handleChange}>
              <option value="HOURLY">Horas</option>
              <option value="DAILY">Días</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notas / Recordatorio:</label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-button">Guardar Todo</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Create;