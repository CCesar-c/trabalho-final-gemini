import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext";
import { api } from "../data/api.js";

export default function Trilha() {
  const { estudante } = useEstudante();
  const [listaTemas, setListaTemas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!estudante) return;

    // Consulta real a tu endpoint de Node.js
    api
      .post("/consulta_trilha", { id_estudante: estudante.id_estudante })
      .then((resposta) => {
        // Tu base de datos guarda el JSON en la columna 'temas_ia'
        const dadosTrilha = resposta.data[0];

        // Verificamos si los temas vienen como string o como objeto JSON directo
        const temas =
          typeof dadosTrilha.temas_ia === "string"
            ? JSON.parse(dadosTrilha.temas_ia)
            : dadosTrilha.temas_ia;

        setListaTemas(temas || []);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao carregar a trilha:", erro);
        setCarregando(false);
      });
  }, [estudante]);

  if (!estudante) return <p>Por favor, faça o login primeiro.</p>;
  if (carregando) return <p>Carregando sua trilha pedagógica...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Trilha de Aprendizado Adaptativa</h2>
      <p>
        Estudante: <strong>{estudante.nome}</strong>
      </p>
      <p>Com base no seu diagnóstico, a IA estruturou os seguintes tópicos:</p>

      <div style={{ marginTop: "20px" }}>
        {listaTemas.map((tema) => (
          <div
            key={tema.id} // Requisito obligatorio: KEY única en el .map
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <strong>Tópico #{tema.id}:</strong> {tema.nome_topico}
            </span>
            {/* Navegación dinámica usando el ID del tema en la URL */}
            <Link
              to={`/topico/${tema.id}?nome=${encodeURIComponent(tema.nome_topico)}`}
              style={{
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              Estudar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
