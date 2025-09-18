import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import { createMedication, updateMedication } from "../../services/medication";

export default function Create() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editing = state?.editing || null;

  const handleSubmit = async (data) => {
    if (editing?.id) {
      await updateMedication({ id: editing.id, ...data });
    } else {
      await createMedication(data);
    }
    navigate("/");
  };

  return (
    <div style={{ padding:"16px" }}>
      <h1>{editing ? "Editar medicamento" : "Nuevo medicamento"}</h1>
      <Form
        initialData={editing || {}}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
