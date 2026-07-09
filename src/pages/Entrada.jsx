import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext.jsx";
import { api } from "../data/api.js";
import Card from "../components/Card.jsx";
import CampoTexto from "../components/CampoTexto.jsx";
import Botao from "../components/Botao.jsx";
import MensagemErro from "../components/MensagemErro.jsx";

export default function Entrada() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const { setEstudante } = useEstudante();
  const navigate = useNavigate();

  async function handleSubmeter(e) {
    e.preventDefault(); // impede o recarregamento nativo do navegador
    setErro("");
    setCarregando(true);

    try {
      const resposta = await api.post("/estudante", { nome, email });
      const estudanteCriado = resposta.data?.[0];

      if (estudanteCriado) {
        setEstudante(estudanteCriado); // guarda no Context API
        navigate("/diagnostico");
      } else {
        setErro("Não foi possível identificar o estudante. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      setErro(
        error.code === "ECONNABORTED"
          ? "O servidor demorou demais para responder. Verifique se o back-end está rodando."
          : "Erro ao conectar com o servidor. Verifique se o back-end está rodando em http://localhost:3000."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container container--estreito">
      <Card titulo="Portal do Estudante · SENAI DESI">
        <MensagemErro mensagem={erro} />
        <form onSubmit={handleSubmeter}>
          <CampoTexto
            label="Nome"
            valor={nome}
            onChange={setNome}
            obrigatorio
            disabled={carregando}
          />
          <CampoTexto
            label="E-mail"
            tipo="email"
            valor={email}
            onChange={setEmail}
            obrigatorio
            disabled={carregando}
          />
          <Botao type="submit" bloco disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar e iniciar sistema"}
          </Botao>
        </form>
        <p className="mt-16 text-suave" style={{ textAlign: "center" }}>
          Primeira vez aqui? <Link to="/cadastro">Criar conta</Link>
        </p>
      </Card>
    </div>
  );
}
