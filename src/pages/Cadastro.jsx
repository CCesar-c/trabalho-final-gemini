import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext";
import { api } from "../data/api.js";

export default function Cadastro() {
  // 1. Estados locales para controlar cada campo del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);

  // 2. Hooks globales para manejo de sesión y rutas
  const { setEstudante } = useEstudante();
  const navigate = useNavigate();

  // 3. Función para procesar el envío de datos a la API
  const handleCadastro = async (e) => {
    e.preventDefault(); // Detiene el recargo nativo de página del navegador
    setCarregando(true); // Activa el estado visual de carga obligatorio

    try {
      // Petición HTTP usando Axios hacia tu backend
      const resposta = await api.post("/estudante", {
        nome: username, // Tu base de datos espera el campo 'nome'
        email: email,
      });

      const estudanteCriado = resposta.data[0]; // Captura el registro retornado por PostgreSQL

      if (estudanteCriado) {
        setEstudante(estudanteCriado); // Almacena el ID del estudiante en el Context API
        navigate("/diagnostico"); // Navegación programática hacia el cuestionario
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor ou e-mail já cadastrado.");
    } finally {
      setCarregando(false); // Apaga el estado de carga
    }
  };

  return (
    // Se cambia el div por un contenedor semántico <form> con evento onSubmit
    <form
      onSubmit={handleCadastro}
      style={{
        gap: 10,
        flexDirection: "column",
        display: "flex",
        height: "100vh",
        maxWidth: "300px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <h3>Cadastro de Estudante (DESI)</h3>

      {/* Componentes controlados: valor enlazado al estado + evento onChange */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={carregando}
        required
      />

      <input
        type="email" // Tipo cambiado a email para validación nativa del navegador
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={carregando}
        required
      />

      {/* Tipo cambiado a submit para activar la validación y el evento del formulario */}
      <button type="submit" disabled={carregando}>
        {carregando ? "Processando..." : "Cadastrar"}
      </button>
      <Link to={"/"}>Fazer Login</Link>
    </form>
  );
}
