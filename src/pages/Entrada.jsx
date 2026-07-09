import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext.jsx";
import { api } from "../data/api.js";

export default function Entrada() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const { setEstudante } = useEstudante();
  const navigate = useNavigate();

  const handleSubmeter = async (e) => {
    e.preventDefault(); // Detiene el recargo de página nativo del navegador
    
    try {
      // Conexión real con tu endpoint de Node.js
      const resposta = await api.post("/estudante", { nome, email });
      
      // Tomamos el primer registro devuelto por el 'RETURNING *' de tu base de datos
      const estudanteCriado = resposta.data[0]; 
      
      if (estudanteCriado) {
        setEstudante(estudanteCriado); // Guardamos en el Contexto Global
        navigate("/diagnostico"); // Navegación programática a la siguiente pantalla
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor do banco de dados.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Portal do Estudante - SENAI DESI</h2>
      <form onSubmit={handleSubmeter}>
        <div style={{ marginBottom: "15px" }}>
          <label>Nome:</label>
          <input 
            type="text" 
            style={{ width: "100%", padding: "8px" }}
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>E-mail:</label>
          <input 
            type="email" 
            style={{ width: "100%", padding: "8px" }}
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Entrar e Iniciar Sistema
        </button>
      </form>
      <Link to={"/cadastro"}>Criar conta</Link>
    </div>
  );
}
