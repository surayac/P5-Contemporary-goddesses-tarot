import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Deck from './components/Deck'
import { Routes, Route } from 'react-router-dom'
import Cards from './pages/Cards'
import Reading from './pages/Reading'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/deck" element={<Deck />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/reading" element={<Reading />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App

