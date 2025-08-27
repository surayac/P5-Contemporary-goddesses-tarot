import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header'
import Intro from './pages/Intro'
import FormUsuario from './components/Form/FormUsuario'
import Footer from './components/Footer/Footer'


function App() {
  
  return (
    <> 
    
    <Header />    
    <h1>ORÁCULO DE LAS DIOSAS</h1>
    <Intro /> 
    <Toaster position="top-right" reverseOrder={false} />
    <FormUsuario />
      <Footer />
    </>
  )
}

export default App;
