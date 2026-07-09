import { useEffect, useState } from "react";
import { useEstudante } from "../contexts/EstudanteContext.jsx";
import { api } from "../data/api.js";
import Card from "../components/Card.jsx";
import Loading from "../components/Loading.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import EstadoVazio from "../components/EstadoVazio.jsx";
import ItemTrilha from "../components/ItemTrilha.jsx";

export default function Trilha() {
  const { estudante, trilha, setTrilha } = useEstudante();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [buscou, setBuscou] = useState(false);

  useEffect(() => {
    if (!estudante) return;

    // Se a trilha já veio pelo Context (recém-gerada no Diagnóstico),
    // não precisa buscar de novo — só confirma o carregamento.
    if (trilha && trilha.length > 0) {
      setCarregando(false);
      return;
    }

    // "buscou" evita repetir a chamada indefinidamente caso a trilha
    // volte vazia (ex.: estudante ainda sem diagnóstico salvo).
    if (buscou) {
      setCarregando(false);
      return;
    }

    api
      .post("/consulta_trilha", { id_estudante: estudante.id_estudante })
      .then((resposta) => {
        const dadosTrilha = resposta.data?.[0];
        const temas =
          typeof dadosTrilha?.temas_ia === "string"
            ? JSON.parse(dadosTrilha.temas_ia)
            : dadosTrilha?.temas_ia || [];
        setTrilha(temas);
      })
      .catch((erroReq) => {
        console.error("Erro ao carregar a trilha:", erroReq);
        if (erroReq.response?.status === 404) {
          setTrilha([]);
        } else {
          setErro("Não foi possível carregar sua trilha. Verifique se o back-end está rodando.");
        }
      })
      .finally(() => {
        setBuscou(true);
        setCarregando(false);
      });
    // Refaz a busca sempre que o estudante identificado mudar
  }, [estudante, trilha, setTrilha, buscou]);

  if (!estudante) {
    return (
      <div className="container">
        <Card>
          <p>Por favor, faça o login primeiro.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container">
      <Card titulo="Trilha de aprendizado adaptativa">
        <p>
          Estudante: <strong>{estudante.nome}</strong>
        </p>
        <p className="text-suave">
          Com base no seu diagnóstico, a IA estruturou os seguintes tópicos:
        </p>

        <MensagemErro mensagem={erro} />

        {carregando ? (
          <Loading mensagem="Carregando sua trilha pedagógica..." />
        ) : trilha.length === 0 ? (
          <EstadoVazio mensagem="Você ainda não tem uma trilha gerada. Volte ao diagnóstico para criar uma." />
        ) : (
          <div className="mt-16">
            {trilha.map((tema) => (
              <ItemTrilha key={tema.id} tema={tema} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
