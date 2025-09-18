import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  // 1. Estado para TODOS los campos (Medicamento + Horario)
  const [formData, setFormData] = useState({
    // Campos del Medicamento
    name: '',
    dosageQuantity: 1,
    dosageUnit: '',
    notes: '',
    // Campos del Horario (Posology)
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

    // --- LÓGICA DE DOBLE LLAMADA ---
    try {
      // **LLAMADA 1: Crear el Medicamento**
      const medicationData = {
        userId: 1, // ID del usuario logueado
        name: formData.name,
        dosageQuantity: parseInt(formData.dosageQuantity, 10),
        dosageUnit: formData.dosageUnit,
        active: true,
        notes: formData.notes,
      };

      const medicationResponse = await axios.post('http://localhost:8080/api/medications', medicationData);
      const newMedicationId = medicationResponse.data.id; // ¡Obtenemos el ID del nuevo medicamento!

      // **LLAMADA 2: Crear el Horario (Posology)**
      const posologyData = {
        medicationId: newMedicationId, // Usamos el ID que acabamos de obtener
        userId: 1, // ID del usuario logueado
        startDate: formData.startDate,
        endDate: formData.endDate,
        dayTime: `${formData.startDate}T${formData.dayTime}`, // Combinamos fecha y hora
        frequencyValue: parseInt(formData.frequencyValue, 10),
        frequencyUnit: formData.frequencyUnit,
        quantity: parseInt(formData.dosageQuantity, 10), // Usamos la misma cantidad que el medicamento
        reminderMessage: formData.notes, // Usamos las mismas notas
        dosesNumber: 30, // Un valor por defecto, puedes añadirlo al form si quieres
      };

      await axios.post('http://localhost:8080/api/posologies', posologyData);

      // Si ambas llamadas funcionan, todo ha ido bien
      alert('¡Medicamento y horario guardados con éxito!');
      navigate('/medicamentos'); // Volvemos a la lista de medicamentos

    } catch (apiError) {
      console.error('Ocurrió un error en el proceso de guardado:', apiError);
      setError('No se pudo guardar. Revisa todos los campos y la consola para más detalles.');
    }
  };

  return (
    <div>
      <h1>Añadir Nuevo Medicamento y Horario</h1>
      <form onSubmit={handleSubmit}>
        {/* --- Campos del Medicamento --- */}
        <h3>Datos del Medicamento</h3>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Dosis:</label>
          <input type="number" name="dosageQuantity" value={formData.dosageQuantity} onChange={handleChange} min="1" required />
        </div>
        <div>
          <label>Unidad (mg, comprimido, etc.):</label>
          <input type="text" name="dosageUnit" value={formData.dosageUnit} onChange={handleChange} required />
        </div>
        
        {/* --- Campos del Horario --- */}
        <h3>Pauta y Horario</h3>
        <div>
          <label>Fecha de Inicio:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Fecha de Fin (opcional):</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <div>
          <label>Hora de la primera toma:</label>
          <input type="time" name="dayTime" value={formData.dayTime} onChange={handleChange} required />
        </div>
        <div>
          <label>Frecuencia:</label>
          <input type="number" name="frequencyValue" value={formData.frequencyValue} onChange={handleChange} required />
          <select name="frequencyUnit" value={formData.frequencyUnit} onChange={handleChange}>
            <option value="HOURLY">Horas</option>
            <option value="DAILY">Días</option>
          </select>
        </div>
        <div>
          <label>Notas / Recordatorio:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>

        <button type="submit">Guardar Todo</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Create;