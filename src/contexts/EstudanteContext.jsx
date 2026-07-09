import { createContext, useContext, useState } from "react";

// 1) Cria o contexto: guarda os dados que várias telas precisam
//    (o estudante identificado e os temas da trilha atual), evitando
//    ter que repassar as mesmas props por vários níveis (prop drilling).
const EstudanteContext = createContext(null);

// 2) Provider: "abraça" o <App /> em main.jsx
export default function EstudanteProvider({ children }) {
  const [estudante, setEstudante] = useState(null);
  const [trilha, setTrilha] = useState([]);
  const [progresso, setProgresso] = useState([]);

  function sair() {
    setEstudante(null);
    setTrilha([]);
    setProgresso([]);
  }

  return (
    <EstudanteContext.Provider
      value={{
        estudante,
        setEstudante,
        trilha,
        setTrilha,
        progresso,
        setProgresso,
        sair,
      }}
    >
      {children}
    </EstudanteContext.Provider>
  );
}

// 3) Atalho para consumir o contexto em qualquer tela
export function useEstudante() {
  const contexto = useContext(EstudanteContext);
  if (!contexto) {
    throw new Error("useEstudante precisa ser usado dentro de <EstudanteProvider>");
  }
  return contexto;
}
