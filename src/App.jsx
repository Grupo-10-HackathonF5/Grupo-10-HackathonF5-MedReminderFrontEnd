// src/App.jsx
import React, { useState, useEffect } from "react";
import Form from "./components/form/Form";
import MedicationList from "./components/list/MedicationList";
import {
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
} from "./services/medicationService";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [medications, setMedications] = useState([]);
  const [message, setMessage] = useState("");

  // Cargar lista al iniciar
  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const data = await getMedications();
      setMedications(data);
    } catch (error) {
      console.error("Error cargando medicamentos:", error);
    }
  };

  const handleAdd = () => {
    setSelectedMedication(null); // formulario vacío
    setShowForm(true);
  };

  const handleEdit = (medication) => {
    setSelectedMedication(medication); // cargar datos en el form
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedMedication && selectedMedication.id) {
        await updateMedication({ ...data, id: selectedMedication.id });
        setMessage("Medicamento actualizado ✅");
      } else {
        await createMedication(data);
        setMessage("Medicamento creado ✅");
      }
      setShowForm(false); // volver a la lista
      loadMedications();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error guardando medicamento:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás segura/o de que querés borrar este medicamento?")) {
      try {
        await deleteMedication(id);
        setMessage("Medicamento borrado ✅");
        loadMedications();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Error borrando medicamento:", error);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#0D1846" }}>
        Gestor de Medicamentos
      </h1>

      {message && (
        <p
          style={{
            backgroundColor: "#e0ffe0",
            color: "#006600",
            padding: "0.5rem",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

      {showForm ? (
        <Form onSubmit={handleSubmit} initialData={selectedMedication} />
      ) : (
        <MedicationList
          medications={medications}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
