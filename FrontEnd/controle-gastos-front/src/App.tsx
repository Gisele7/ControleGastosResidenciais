import { BrowserRouter, Routes, Route } from "react-router-dom"
import Pessoas from "./pages/Pessoas"
import Navbar from "./components/Navbar"
import Categorias from "./pages/Categorias"
import Transacoes from "./pages/Transacoes"
import TotaisPorPessoa from "./pages/TotaisPorPessoa"
import TotaisPorCategoria from "./pages/TotaisPorCategoria"
import Dashboard from "./pages/Dashboard"


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/totais-por-categoria" element={<TotaisPorCategoria />} />
        <Route path="/totais-por-pessoa" element={<TotaisPorPessoa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App