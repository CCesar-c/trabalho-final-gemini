import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext";
import { api } from "../data/api.js";

export default function Painel() {
  const { estudante } = useEstudante();
  const navigate = useNavigate();

  // Estados para controlar los datos de la API y la interfaz
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!estudante) return;

    // Consultamos el historial del alumno usando su id
    api
      .post("/consulta_trilha", { id_estudante: estudante.id_estudante })
      .then(() => {
        // Para el historial de notas, llamamos a un endpoint que nos traiga su progreso
        // Como tu backend usa la ruta /evolucao para guardar, podemos simular la consulta aquí
        // O si creaste un endpoint de consulta, lo apuntas directamente.
        // Simulamos la carga de su tabla 'progresso' de PostgreSQL:
        return api.get(`/api/historico/${estudante.id_estudante}`); // Ruta opcional o simulada
      })
      .then((resposta) => {
        setHistorico(resposta.data || []);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao buscar histórico:", erro);
        // Si aún no hay notas en la base de datos, dejamos el historial vacío
        setHistorico([]);
        setCarregando(false);
      });
  }, [estudante]);

  if (!estudante) return <p>Por favor, faça o login primeiro.</p>;

  // Requisito del documento: Renderización condicional para el estado "CARREGANDO"
  if (carregando) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3>Carregando estatísticas do estudante...</h3>
      </div>
    );
  }

  // Cálculos de progreso para la interfaz
  const totalTopicosAprovados = historico.filter(
    (item) => item.estado_aprovacao === "Aprovado",
  ).length;
  const notaMedia =
    historico.length > 0
      ? (
          historico.reduce((acc, curr) => acc + Number(curr.notas), 0) /
          historico.length
        ).toFixed(1)
      : 0;

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Painel de Desempenho do Estudante</h2>
      <p>
        Estudante: <strong>{estudante.nome}</strong>
      </p>

      {/* Tarjetas de Resumen Técnico */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <div
          style={{
            flex: 1,
            padding: "15px",
            backgroundColor: "#f0f4f8",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h4>Módulos Concluídos</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0" }}>
            {totalTopicosAprovados} / 5
          </p>
        </div>
        <div
          style={{
            flex: 1,
            padding: "15px",
            backgroundColor: "#f0f4f8",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h4>Média Geral Técnico</h4>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: "5px 0",
              color: notaMedia >= 7 ? "green" : "orange",
            }}
          >
            {notaMedia}
          </p>
        </div>
      </div>

      <h3>Histórico de Verificações da IA</h3>

      {/* Requisito del documento: Renderización condicional para el estado "VAZIO" */}
      {historico.length === 0 ? (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeba0",
            borderRadius: "5px",
          }}
        >
          <p>
            Você ainda não realizou nenhuma avaliação técnica. Vá para a sua
            trilha e conclua um tópico!
          </p>
        </div>
      ) : (
        // Listado utilizando .map() con su respectiva KEY obligatoria
        <div style={{ marginTop: "15px" }}>
          {historico.map((item, index) => (
            <div
              key={item.progresso_id || index}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "10px",
                backgroundColor:
                  item.estado_aprovacao === "Aprovado" ? "#e2f0d9" : "#fce4d6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Avaliação #{index + 1}</span>
                <span>Nota: {item.notas}</span>
              </div>
              <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                <strong>Resultado:</strong> {item.estado_aprovacao}
              </p>
              <p
                style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#555" }}
              >
                <strong>Feedback guardado:</strong> {item.feedback_ia}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/trilha")}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          cursor: "pointer",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Voltar para a Trilha
      </button>
    </div>
  );
}
