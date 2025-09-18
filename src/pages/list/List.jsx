import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMedications, deleteMedication } from "../../services/medicationService";
import Card from "../../components/card/Card";
import "./List.css";

const List = () => {
  const [meds, setMeds] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const data = await getMedications();
    setMeds(data);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Borrar este medicamento?")) {
      await deleteMedication(id);
      load();
    }
  };

  return (
    <div className="medication-list">
      <div className="medication-list__header">
        <h1>Mis medicamentos</h1>
        <button className="btn-primary" onClick={() => navigate("/create")}>
          + Agregar
        </button>
      </div>

      {meds.length === 0 ? (
        <p className="medication-list__empty">Aún no tienes medicamentos guardados.</p>
      ) : (
        <ul className="medication-list__grid">
          {meds.map((m) => (
            <li key={m.id}>
              <Card title={m.name}>
                <p><strong>Dosis:</strong> {m.dosage}</p>
                <p><strong>Concentración:</strong> {m.strength}</p>
                <div className="row-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => navigate("/create", { state: { editing: m } })}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(m.id)}
                  >
                    Borrar
                  </button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
