import React, { useState } from 'react';
import axios from 'axios';
// Opcional: Si tienes un archivo CSS para esta página, puedes importarlo.
// import './Create.css'; 

const Create = () => {
  // Estados para guardar la información de cada campo del formulario
  const [medicationName, setMedicationName] = useState('');
  const [dosageQuantity, setDosageQuantity] = useState(1);
  const [dosageUnit, setDosageUnit] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Esta es la función que se ejecuta al presionar el botón "Guardar"
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario
    setError(null); // Limpia errores anteriores
    setSuccessMessage(''); // Limpia mensajes de éxito anteriores

    // 1. Creamos el objeto con los datos del medicamento.
    //    Tu backend espera recibir estos campos.
    const newMedication = {
      userId: 1, // ¡IMPORTANTE! Este valor debe ser dinámico, del usuario que ha iniciado sesión. Por ahora, usamos 1 como ejemplo.
      name: medicationName,
      dosageQuantity: parseInt(dosageQuantity, 10), // Nos aseguramos de que sea un número
      dosageUnit: dosageUnit,
      active: true, // Por defecto, lo creamos como activo
      notes: notes,
    };

    try {
      // 2. Hacemos la llamada a la API con la URL CORRECTA.
      //    Esta es la línea que soluciona tu error 404.
      const response = await axios.post('http://localhost:8080/api/medications', newMedication);

      // 3. Si todo va bien, mostramos un mensaje de éxito.
      console.log('Medicamento creado con éxito:', response.data);
      setSuccessMessage(`¡Medicamento "${response.data.name}" guardado correctamente!`);

      // 4. Opcional: Limpiar el formulario después de guardar
      setMedicationName('');
      setDosageQuantity(1);
      setDosageUnit('');
      setNotes('');

    } catch (apiError) {
      // 5. Si la API devuelve un error, lo mostramos.
      console.error('Error al crear el medicamento:', apiError);
      setError('No se pudo guardar el medicamento. Por favor, revisa los datos e inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Nuevo medicamento</h1>
      
      {/* El atributo onSubmit del formulario llama a nuestra función handleSubmit */}
      <form onSubmit={handleSubmit}>
        
        {/* Campo para el Nombre del Medicamento */}
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

        {/* Campo para la Unidad de la Dosis */}
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
        
        {/* Campo para Notas Adicionales */}
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

      {/* Mostramos mensajes de éxito o error aquí */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};

export default Create;