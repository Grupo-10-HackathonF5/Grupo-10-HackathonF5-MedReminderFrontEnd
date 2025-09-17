import './App.css'
import { Toaster } from 'react-hot-toast'
import Footer from './components/footer/Footer'
import AppRoutes from './application/Router'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
