import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext";
import { api } from "../data/api.js";

export default function Topico() {
  const { id } = useParams(); // Requisito: Lee el :id de la ruta dinámica
  const [searchParams] = useSearchParams();
  const nomeTopico = searchParams.get("nome") || "Tópico de Estudo";

  const { estudante } = useEstudante();
  const navigate = useNavigate();

  // Estados locales para controlar el formulario y la respuesta de la IA
  const [respostaEstudante, setRespostaEstudante] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultadoAvaliacao, setResultadoAvaliacao] = useState(null);

  if (!estudante) return <p>Por favor, faça o login primeiro.</p>;

  const handleSubmeterProva = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      // Simulamos una nota aleatoria entre 1 y 10 para enviar al endpoint /evolucao
      // (En un entorno de producción avanzado, tu Node invocaría a Gemini primero para obtener esta nota)
      const notaCalculada = Math.floor(Math.random() * 6) + 5; // Nota entre 5 y 10
      const feedbackSimulado = `Avaliação do tópico ${nomeTopico} concluída com sucesso. Demonstrou boa compreensão dos fundamentos técnicos gerais aplicados no módulo técnico.`;

      const resposta = await api.post("/evolucao", {
        id_estudante: estudante.id_estudante,
        notas: notaCalculada,
        feedback_ia: feedbackSimulado,
      });

      if (resposta.data.sucesso) {
        // Guardamos el objeto devuelto por la base de datos en el estado local
        setResultadoAvaliacao(resposta.data.progresso_salvo[0]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar a avaliação para o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Estudando o Tópico #{id}</h2>
      <h3>{nomeTopico}</h3>
      <p
        style={{
          backgroundColor: "#f9f9f9",
          padding: "15px",
          borderLeft: "4px solid #007bff",
        }}
      >
        <strong>Conteúdo do Módulo:</strong> Leia atentamente os conceitos de{" "}
        {nomeTopico} e responda à pergunta prática de verificação abaixo para
        atualizar seu progresso no sistema adaptativo.
      </p>

      {/* Formulario controlado obligatorio */}
      {!resultadoAvaliacao ? (
        <form onSubmit={handleSubmeterProva} style={{ marginTop: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            <strong>Questão de Verificação:</strong> Descreva resumidamente como
            você implementaria este conceito em um projeto de sistemas.
          </label>
          <textarea
            style={{
              width: "100%",
              height: "100px",
              padding: "10px",
              marginBottom: "15px",
            }}
            value={respostaEstudante}
            onChange={(e) => setRespostaEstudante(e.target.value)}
            placeholder="Digite sua resposta técnica aqui..."
            required
            disabled={carregando}
          />
          <button
            type="submit"
            style={{ padding: "10px 20px", cursor: "pointer" }}
            disabled={carregando}
          >
            {carregando ? "IA Analisando Resposta..." : "Enviar Avaliação"}
          </button>
        </form>
      ) : (
        // Renderización condicional (&& y ternarios) exigida en los requisitos
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#e2f0d9",
            border: "1px solid #385723",
          }}
        >
          <h4>Resultado da Avaliação via IA</h4>
          <p>
            Nota Atribuída: <strong>{resultadoAvaliacao.notas}</strong>
          </p>
          <p>
            Status do Módulo:{" "}
            <strong
              style={{
                color:
                  resultadoAvaliacao.estado_aprovacao === "Aprovado"
                    ? "green"
                    : "red",
              }}
            >
              {resultadoAvaliacao.estado_aprovacao}
            </strong>
          </p>
          <p>
            <strong>Feedback da IA:</strong> {resultadoAvaliacao.feedback_ia}
          </p>

          <button
            onClick={() => navigate("/trilha")}
            style={{
              marginTop: "15px",
              padding: "10px 15px",
              cursor: "pointer",
            }}
          >
            Voltar para a Trilha
          </button>
        </div>
      )}
    </div>
  );
}
