import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './application/Router'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Header />
      <AppRoutes />
      <Footer />
      
      
    </>
  )
}
export default App