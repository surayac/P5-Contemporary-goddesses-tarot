import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './pages/Homepage'
import Deck from './components/Deck'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/deck" element={<Deck />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App

