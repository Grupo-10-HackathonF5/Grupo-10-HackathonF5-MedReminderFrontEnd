import React, { useState } from 'react';
import axios from 'axios';


const Create = () => {

  const [medicationName, setMedicationName] = useState('');
  const [dosageQuantity, setDosageQuantity] = useState(1);
  const [dosageUnit, setDosageUnit] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null); 
    setSuccessMessage(''); 
    
    const newMedication = {
      userId: 1,
      name: medicationName,
      dosageQuantity: parseInt(dosageQuantity, 10), 
      dosageUnit: dosageUnit,
      active: true, 
      notes: notes,
    };

    try {

      const response = await axios.post('http://localhost:8080/api/medications', newMedication);

    
      console.log('Medicamento creado con éxito:', response.data);
      setSuccessMessage(`¡Medicamento "${response.data.name}" guardado correctamente!`);

     
      setMedicationName('');
      setDosageQuantity(1);
      setDosageUnit('');
      setNotes('');

    } catch (apiError) {
      console.error('Error al crear el medicamento:', apiError);
      setError('No se pudo guardar el medicamento. Por favor, revisa los datos e inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Nuevo medicamento</h1>
      
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="medicationName">Nombre del medicamento:</label>
          <input
            id="medicationName"
            type="text"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
            required
          />
        </div>

        {/* Campo para la Dosis */}
        <div>
          <label htmlFor="dosageQuantity">Dosis:</label>
          <input
            id="dosageQuantity"
            type="number"
            value={dosageQuantity}
            onChange={(e) => setDosageQuantity(e.target.value)}
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="dosageUnit">Unidad (ej: mg, comprimido, ml):</label>
          <input
            id="dosageUnit"
            type="text"
            value={dosageUnit}
            onChange={(e) => setDosageUnit(e.target.value)}
            placeholder="mg, comprimido, etc."
            required
          />
        </div>
        
        <div>
          <label htmlFor="notes">Notas adicionales:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tomar con comida, por la mañana, etc."
          />
        </div>

        <button type="submit">Guardar Medicamento</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};

export default Create;