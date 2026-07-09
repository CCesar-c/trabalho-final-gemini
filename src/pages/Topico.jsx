import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext.jsx";
import { api } from "../data/api.js";
import Card from "../components/Card.jsx";
import QuestaoCard from "../components/QuestaoCard.jsx";
import FeedbackBox from "../components/FeedbackBox.jsx";
import Botao from "../components/Botao.jsx";
import MensagemErro from "../components/MensagemErro.jsx";

export default function Topico() {
  const { id } = useParams(); // lê o :id da rota dinâmica
  const [searchParams] = useSearchParams();
  const nomeTopico = searchParams.get("nome") || "Tópico de Estudo";

  const { estudante } = useEstudante();
  const navigate = useNavigate();

  const [respostaEstudante, setRespostaEstudante] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultadoAvaliacao, setResultadoAvaliacao] = useState(null);
  const [erro, setErro] = useState("");

  if (!estudante) {
    return (
      <div className="container">
        <Card>
          <p>Por favor, faça o login primeiro.</p>
        </Card>
      </div>
    );
  }

  async function handleSubmeterProva(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      // Nota simulada localmente entre 5 e 10 — em produção, o back-end
      // chamaria o Gemini para gerar essa nota a partir da resposta.
      const notaCalculada = Math.floor(Math.random() * 6) + 5;
      const feedbackSimulado = `Avaliação do tópico ${nomeTopico} concluída com sucesso. Demonstrou boa compreensão dos fundamentos técnicos gerais aplicados no módulo técnico.`;

      const resposta = await api.post("/evolucao", {
        id_estudante: estudante.id_estudante,
        notas: notaCalculada,
        feedback_ia: feedbackSimulado,
      });

      if (resposta.data.sucesso) {
        setResultadoAvaliacao(resposta.data.progresso_salvo?.[0]);
      }
    } catch (error) {
      console.error(error);
      setErro("Erro ao enviar a avaliação para o servidor. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container">
      <Card titulo={`Estudando o tópico #${id}`}>
        <h3 style={{ marginBottom: 10 }}>{nomeTopico}</h3>
        <p
          style={{
            background: "var(--azul-100)",
            padding: 15,
            borderLeft: "4px solid var(--azul-500)",
            borderRadius: 6,
          }}
        >
          <strong>Conteúdo do módulo:</strong> leia atentamente os conceitos de{" "}
          {nomeTopico} e responda à pergunta prática de verificação abaixo para
          atualizar seu progresso no sistema adaptativo.
        </p>

        <MensagemErro mensagem={erro} />

        {/* Renderização condicional: mostra o formulário até haver
            resultado, depois troca para o FeedbackBox (&& / ternário) */}
        {!resultadoAvaliacao ? (
          <QuestaoCard
            enunciado="Questão de verificação: descreva resumidamente como você implementaria este conceito em um projeto de sistemas."
            resposta={respostaEstudante}
            onChangeResposta={setRespostaEstudante}
            onSubmit={handleSubmeterProva}
            carregando={carregando}
          />
        ) : (
          <div className="mt-16">
            <FeedbackBox
              nota={resultadoAvaliacao.notas}
              estadoAprovacao={resultadoAvaliacao.estado_aprovacao}
              feedback={resultadoAvaliacao.feedback_ia}
            />
            <Botao
              variante="secundario"
              onClick={() => navigate("/trilha")}
              style={{ marginTop: 16 }}
            >
              Voltar para a trilha
            </Botao>
          </div>
        )}
      </Card>
    </div>
  );
}
