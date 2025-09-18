import { Routes, Route } from "react-router-dom";
import List from "../pages/list/List";
import Calendar from "../components/calendar/Calendar";
import Create from "../pages/create/Create";
import Edit from "../pages/edit/Edit";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/create" element={<Create />} />
      <Route path="/medicamentos/edit/:medicationId" element={<Edit />}/>
    </Routes>
  );
}
