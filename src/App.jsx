import './App.css'
import { Toaster } from 'react-hot-toast'
import Footer from './components/footer/Footer'
import AppRoutes from './application/Router'
import Navbar from './components/navbar/Navbar'
import Header from './components/header/header'
import Greeting from './components/greeting/Greeting'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Greeting />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
