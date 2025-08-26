
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Intro from "./pages/Intro.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Intro />} />
      </Routes>
      {/* Notificaciones toast */}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
