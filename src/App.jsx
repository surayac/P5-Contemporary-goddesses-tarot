import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header'
import Intro from './pages/Intro'
import Footer from './components/Footer/Footer'
import Form from './components/Form/Form'


function App() {
  
  return (
    <> 
     <Toaster position="top-right" reverseOrder={false} />
    <Header />    
    <div><h1>ORÁCULO DE LAS DIOSAS</h1>
    <Intro />    
    <Form /></div>
    <Footer />
    </>
  )
}

export default App;
