import { Routes, Route } from 'react-router-dom'
import Create from '../pages/create/Create'
import List from '../pages/list/List'



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/create" element={<Create />} />
      <Route path="/list" element={<List />} />
    </Routes>
  )
}
