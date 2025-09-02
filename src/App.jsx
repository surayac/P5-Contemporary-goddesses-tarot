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
      
   <button
  className="fixed bottom-10 right-3 md:right-10 z-[9999] bg-[#141540] p-4 
  rounded-full shadow-2xl flex items-center justify-center text-[var(--color-starDust)] 
  text-2xl font-bold transform transition-transform duration-800 hover:scale-110"
>
    ↑
  </button>
    </>
  )
}


