import { Routes, Route } from "react-router-dom";

import Entrada from "./pages/Entrada.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Diagnostico from "./pages/Diagnostico.jsx";
import Trilha from "./pages/Trilha.jsx";
import Topico from "./pages/Topico.jsx";
import Painel from "./pages/Painel.jsx";
import PageError from "./pages/PageError.jsx";
import Menu from "./components/Menu.jsx";

function App() {
  return (
    <div className="app-shell">
      <Menu />
      <Routes>
        <Route index path="/" element={<Entrada />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
        <Route path="/trilha" element={<Trilha />} />
        <Route path="/topico/:id" element={<Topico />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
