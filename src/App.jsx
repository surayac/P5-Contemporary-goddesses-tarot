import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import ArrowUp from './components/ArrowUp'
import AppRoutes from './application/Router'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <AppRoutes />
      <Footer />
      
      <ArrowUp />
    </>
  )
}
export default App