// src/components/form/Form.jsx
import React, { useState } from "react";
import './Form.css';

const Form = ({ onSubmit, initialData = {} }) => {
  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Página 1 */}
      {currentPage === 1 && (
        <div className="page-1">
          <div>
            <label htmlFor="name">Nombre Medicamento</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Aspirina"
              required
            />
          </div>
          <div>
            <label htmlFor="dosage">Posología/Dosis</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage || ""}
              onChange={handleChange}
              placeholder="1 píldora al día"
              required
            />
          </div>
          <div>
            <label htmlFor="strength">Gramaje / concentración</label>
            <input
              type="text"
              id="strength"
              name="strength"
              value={formData.strength || ""}
              onChange={handleChange}
              placeholder="500 mg"
              required
            />
          </div>
          <button type="button" onClick={handleNextPage}>Siguiente</button>
        </div>
      )}

      {/* Página 2 */}
      {currentPage === 2 && (
        <div className="page-2">
          <div>
            <label htmlFor="frequency">Frecuencia de toma (veces al día)</label>
            <input
              type="text"
              id="frequency"
              name="frequency"
              value={formData.frequency || ""}
              onChange={handleChange}
              placeholder="c/ 8 horas"
              required
            />
          </div>
          <div>
            <label htmlFor="interval">Intervalo entre tomas</label>
            <input
              type="text"
              id="interval"
              name="interval"
              value={formData.interval || ""}
              onChange={handleChange}
              placeholder="2 veces al día"
              required
            />
          </div>
          <div>
            <label htmlFor="time">Hora de la primera toma</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time || ""}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Guardar</button>
        </div>
      )}
    </form>
  );
};

export default Form;