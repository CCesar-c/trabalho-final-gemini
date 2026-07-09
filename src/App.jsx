// Gerenciador de rotas
import { Routes, Route } from "react-router-dom";

import Entrada from './pages/Entrada.jsx';
import PageError from './pages/PageError';
import Diagnostico from './pages/Diagnostico.jsx'
import Trilha from './pages/Trilha.jsx'
import Topico from './pages/Topico.jsx'
import Painel from './pages/Painel.jsx'
import Cadastro from './pages/Cadastro.jsx'

import EstudanteProvider from "./contexts/EstudanteContext.jsx";

import './style/.css'

function App() {
  return (
    <EstudanteProvider>
      <Routes>
        <Route index path='/' Component={Entrada} />
        <Route path='/diagnostico' Component={Diagnostico} />
        <Route path='/trilha' Component={Trilha} />
        <Route path='/topico/:id' Component={Topico} />
        <Route path='/painel' Component={Painel} />
        <Route path='/cadastro' Component={Cadastro} />
        <Route path='*' element={<PageError />} />
      </Routes>
    </EstudanteProvider>
  )
}

export default App