import './App.css'
import { Toaster } from 'react-hot-toast'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import AppRoutes from './application/Router'
import Greeting from './components/greeting/Greeting'
import Edit from './pages/edit/Edit';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Greeting/>
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </>
  )
}

export default App
