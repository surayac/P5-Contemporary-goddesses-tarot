import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './pages/Homepage'


function App() {

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Homepage />
      <Footer />
    </>
  )
}

export default App;
