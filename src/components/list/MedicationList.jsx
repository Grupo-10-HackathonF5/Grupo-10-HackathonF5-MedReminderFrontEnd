// src/components/list/MedicationList.jsx
import React from "react";
import './MedicationList.css';

const MedicationList = ({ medications, onAdd, onEdit, onDelete }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", color: "#0D1846" }}>
        Mis Medicamentos
      </h2>

      <button
        onClick={onAdd}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        ➕ Agregar medicamento
      </button>

      {medications.length === 0 ? (
        <p>No hay medicamentos registrados.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {medications.map((med) => (
            <li
              key={med.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <strong>{med.name}</strong> - {med.dosage}
              <br />
              <button
                onClick={() => onEdit(med)}
                style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => onDelete(med.id)}
                style={{ marginTop: "0.5rem" }}
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
