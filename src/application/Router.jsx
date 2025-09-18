import { Routes, Route } from 'react-router-dom'
// import Create from '../pages/create/Create'
import List from '../pages/list/List'
import Calendar from '../components/calendar/Calendar'



export default function AppRoutes() {
  return (
    <Routes>
       <Route path="/" element={<List />} />
       <Route path="/calendar" element={<Calendar />} />
      {/*<Route path="/create" element={<Create />} />
      <Route path="/list" element={<List />} /> */}
    </Routes>
  )
}