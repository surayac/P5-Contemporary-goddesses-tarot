import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Deck from './pages/Deck'
import { Routes, Route } from 'react-router-dom'
import Cards from './pages/Cards'
import Reading from './pages/Reading'
import AppRoutes from './application/Router'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <AppRoutes />
      <Footer />
      
      
    </>
  )
}
export default App