import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './application/Router'

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <AppRoutes />
      <Footer />
    </>
  )
}


