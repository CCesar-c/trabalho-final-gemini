import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext.jsx";
import { api } from "../data/api.js";
import Card from "../components/Card.jsx";
import Loading from "../components/Loading.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import EstadoVazio from "../components/EstadoVazio.jsx";
import BarraProgresso from "../components/BarraProgresso.jsx";
import Botao from "../components/Botao.jsx";

export default function Painel() {
  const { estudante } = useEstudante();
  const navigate = useNavigate();

  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!estudante) return;

    api
      .get(`/api/historico/${estudante.id_estudante}`)
      .then((resposta) => {
        setHistorico(resposta.data || []);
      })
      .catch((erroReq) => {
        console.error("Erro ao buscar histórico:", erroReq);
        setErro("Não foi possível carregar seu histórico agora.");
        setHistorico([]);
      })
      .finally(() => setCarregando(false));
    // Refaz a busca se o estudante identificado mudar
  }, [estudante]);

  if (!estudante) {
    return (
      <div className="container">
        <Card>
          <p>Por favor, faça o login primeiro.</p>
        </Card>
      </div>
    );
  }

  if (carregando) {
    return (
      <div className="container">
        <Loading mensagem="Carregando estatísticas do estudante..." />
      </div>
    );
  }

  const totalTopicosAprovados = historico.filter(
    (item) => item.estado_aprovacao === "Aprovado"
  ).length;

  const notaMedia =
    historico.length > 0
      ? historico.reduce((acc, curr) => acc + Number(curr.notas), 0) / historico.length
      : 0;

  return (
    <div className="container">
      <Card titulo="Painel de desempenho do estudante">
        <p>
          Estudante: <strong>{estudante.nome}</strong>
        </p>

        <MensagemErro mensagem={erro} />

        <div style={{ display: "flex", gap: 20, margin: "20px 0" }}>
          <div style={{ flex: 1 }}>
            <BarraProgresso
              valor={totalTopicosAprovados}
              maximo={5}
              rotulo={`Módulos concluídos: ${totalTopicosAprovados} / 5`}
            />
          </div>
        </div>

        <p>
          Média geral:{" "}
          <strong style={{ color: notaMedia >= 7 ? "var(--sucesso)" : "var(--acento)" }}>
            {notaMedia.toFixed(1)}
          </strong>
        </p>

        <h3 style={{ fontSize: 15, marginTop: 24, marginBottom: 10 }}>
          Histórico de verificações da IA
        </h3>

        {historico.length === 0 ? (
          <EstadoVazio mensagem="Você ainda não realizou nenhuma avaliação técnica. Vá para a sua trilha e conclua um tópico!" />
        ) : (
          <div>
            {historico.map((item, index) => (
              <div
                key={item.progresso_id || index}
                className="card"
                style={{
                  padding: 16,
                  marginBottom: 10,
                  background: item.estado_aprovacao === "Aprovado" ? "var(--sucesso-bg)" : "var(--erro-bg)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                  <span>Avaliação #{index + 1}</span>
                  <span>Nota: {item.notas}</span>
                </div>
                <p style={{ margin: "6px 0 0" }}>
                  <strong>Resultado:</strong> {item.estado_aprovacao}
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 13.5 }} className="text-suave">
                  <strong>Feedback:</strong> {item.feedback_ia}
                </p>
              </div>
            ))}
          </div>
        )}

        <Botao variante="secundario" onClick={() => navigate("/trilha")} style={{ marginTop: 10 }}>
          Voltar para a trilha
        </Botao>
      </Card>
    </div>
  );
}
