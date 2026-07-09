import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext.jsx";
import { api } from "../data/api.js";
import Card from "../components/Card.jsx";
import CampoTexto from "../components/CampoTexto.jsx";
import Botao from "../components/Botao.jsx";
import Loading from "../components/Loading.jsx";
import MensagemErro from "../components/MensagemErro.jsx";

export default function Diagnostico() {
  const { estudante, setTrilha } = useEstudante();
  const [textoDiagnostico, setTextoDiagnostico] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Se o estudante ainda não se identificou, não deixa avançar
  if (!estudante) {
    return (
      <div className="container container--estreito">
        <Card>
          <p>Por favor, faça o login na tela inicial primeiro.</p>
        </Card>
      </div>
    );
  }

  async function handleEnviarDiagnostico(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await api.post("/diagnostico", {
        id_estudante: estudante.id_estudante,
        diagnostico: textoDiagnostico,
      });

      if (resposta.data.sucesso) {
        const dadosTrilha = resposta.data.dados_trilha;
        const temas =
          typeof dadosTrilha.temas_ia === "string"
            ? JSON.parse(dadosTrilha.temas_ia)
            : dadosTrilha.temas_ia;

        setTrilha(temas);
        navigate("/trilha");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 504 || error.code === "ECONNABORTED") {
        setErro("A IA demorou demais para responder. Tente novamente.");
      } else if (error.response?.status === 429) {
        setErro("Limite de requisições à IA atingido. Aguarde um instante e tente de novo.");
      } else {
        setErro("Erro ao processar o diagnóstico com a IA. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container container--estreito">
      <Card titulo="Avaliação diagnóstica inicial">
        <p>
          Olá {estudante.nome}, escreva abaixo quais tecnologias você já conhece ou
          quais são suas maiores dificuldades em programação:
        </p>

        <MensagemErro mensagem={erro} />

        {carregando ? (
          <Loading mensagem="🤖 Gemini IA está analisando seu perfil e montando sua trilha personalizada..." />
        ) : (
          <form onSubmit={handleEnviarDiagnostico}>
            <CampoTexto
              valor={textoDiagnostico}
              onChange={setTextoDiagnostico}
              placeholder="Ex: Já sei HTML e CSS, mas tenho muita dificuldade em entender lógica de programação e loops em JavaScript..."
              obrigatorio
              multilinha
              linhas={6}
            />
            <Botao type="submit" bloco>
              Gerar minha trilha adaptativa
            </Botao>
          </form>
        )}
      </Card>
    </div>
  );
}
