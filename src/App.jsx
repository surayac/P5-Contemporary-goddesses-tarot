import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <Header />
      <div><h1>ORÁCULO DE LAS DIOSAS</h1>
      <Toaster />
      </div>
      <Footer />
    </>
  )
}

export default App
