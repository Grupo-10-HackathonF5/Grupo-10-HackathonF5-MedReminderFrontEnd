import React from "react";
import "./MedicationList.css";

const MedicationList = ({ medications, onAdd, onEdit, onDelete }) => {
  return (
    <div className="medication-list">
      <h2 className="medication-list__title">Mis Medicamentos</h2>

      <button onClick={onAdd} className="medication-list__add">
        ➕ Agregar medicamento
      </button>

      {medications.length === 0 ? (
        <p>No hay medicamentos registrados.</p>
      ) : (
        <ul>
          {medications.map((med) => (
            <li key={med.id} className="medication-list__item">
              <strong>{med.name}</strong> - {med.dosage}
              <br />
              <button
                onClick={() => onEdit(med)}
                className="medication-list__button"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => onDelete(med.id)}
                className="medication-list__button"
              >
                🗑️ Borrar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationList;
