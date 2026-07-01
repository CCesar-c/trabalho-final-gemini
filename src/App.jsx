
// Gerenciador de rotas
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import PageError from './pages/PageError';
import EstudanteProvider from "./contexts/EstudanteContext.jsx";
import './style/.css'

function App() {
  return (
    <EstudanteProvider>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/diagnostico' Component={} />
        <Route path='/trilha' Component={Home} />
        <Route path='/topico/:id' Component={Home} />
        <Route path='/painel' Component={Home} />
        <Route path='*' element={<PageError  />} />
      </Routes>
    </EstudanteProvider>
  )
}

export default App
