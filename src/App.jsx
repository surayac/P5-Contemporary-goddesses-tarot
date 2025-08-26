import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>    
      <h1>ORÁCULO DE LAS DIOSAS</h1>
      <Toaster />
    </>
  )
}

export default App
