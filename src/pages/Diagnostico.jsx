import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext";
import { api } from "../data/api.js";

export default function Diagnostico() {
  const { estudante, setTrilha } = useEstudante();
  const [textoDiagnostico, setTextoDiagnostico] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  // Si el usuario entró directo sin registrarse, lo mandamos al inicio
  if (!estudante) {
    return <p>Por favor, faça o login na tela inicial primeiro.</p>;
  }

  const handleEnviarDiagnostico = async (e) => {
    e.preventDefault();
    setCarregando(true); // Activa el estado visual de carga obligatorio

    try {
      // Enviamos el id del alumno y el texto a tu ruta /diagnostico
      const resposta = await api.post("/diagnostico", {
        id_estudante: estudante.id_estudante,
        diagnostico: textoDiagnostico,
      });

      if (resposta.data.sucesso) {
        // Guardamos los temas que generó Gemini en el estado global
        const dadosTrilha = resposta.data.dados_trilha[0];
        setTrilha(dadosTrilha.temas_ia);

        navigate("/trilha"); // Vamos a la pantalla que lista los temas
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao processar o diagnóstico com a IA do Gemini.");
    } finally {
      setCarregando(false); // Apaga el estado de carga
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Avaliação Diagnóstica Inicial</h2>
      <p>
        Olá {estudante.nome}, escreva abaixo quais tecnologias você já conhece
        ou quais são suas maiores dificuldades em programação:
      </p>

      {carregando ? (
        // Renderización condicional de carga
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f3f3f3",
            fontWeight: "bold",
          }}
        >
          🤖 Gemini IA está analisando seu perfil e montando sua trilha
          personalizada... Por favor, aguarde.
        </div>
      ) : (
        <form onSubmit={handleEnviarDiagnostico}>
          <textarea
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              marginBottom: "15px",
            }}
            placeholder="Ex: Já sei HTML e CSS, mas tenho muita dificuldade em entender lógica de programação e loops em JavaScript..."
            value={textoDiagnostico}
            onChange={(e) => setTextoDiagnostico(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Gerar Minha Trilha Adaptativa
          </button>
        </form>
      )}
    </div>
  );
}
