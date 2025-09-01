import { Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Deck from '../pages/Deck'
import Cards from '../pages/Cards'
import Reading from '../pages/Reading'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/deck" element={<Deck />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/reading" element={<Reading />} />
    </Routes>
  )
}
