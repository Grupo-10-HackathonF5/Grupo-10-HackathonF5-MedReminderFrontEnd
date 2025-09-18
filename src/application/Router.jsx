import { Routes, Route } from "react-router-dom";
import List from "../pages/list/List";
import Calendar from "../components/calendar/Calendar";
import Create from "../pages/create/Create";
import Edit from "../pages/edit/Edit"; // 
const Home = () => <h2>Bienvenido a MedReminder</h2>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* 2. He ajustado las rutas para que sean más descriptivas */}
      <Route path="/" element={<Home />} />
      <Route path="/medicamentos" element={<List />} /> 
      <Route path="/calendario" element={<Calendar />} />
      <Route path="/crear" element={<Create />} />
      {/* 3. ¡Añadimos la nueva ruta para editar! */}
      <Route path="/medicamentos/edit/:medicationId" element={<Edit />} />
    </Routes>
  );
}