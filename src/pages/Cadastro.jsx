import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext.jsx";
import { api } from "../data/api.js";
import Card from "../components/Card.jsx";
import CampoTexto from "../components/CampoTexto.jsx";
import Botao from "../components/Botao.jsx";
import MensagemErro from "../components/MensagemErro.jsx";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const { setEstudante } = useEstudante();
  const navigate = useNavigate();

  async function handleCadastro(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await api.post("/estudante", { nome, email });
      const estudanteCriado = resposta.data?.[0];

      if (estudanteCriado) {
        setEstudante(estudanteCriado);
        navigate("/diagnostico");
      } else {
        setErro("Não foi possível concluir o cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro("Erro ao conectar com o servidor ou e-mail já cadastrado.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container container--estreito">
      <Card titulo="Cadastro de Estudante (DESI)">
        <MensagemErro mensagem={erro} />
        <form onSubmit={handleCadastro}>
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
            {carregando ? "Processando..." : "Cadastrar"}
          </Botao>
        </form>
        <p className="mt-16 text-suave" style={{ textAlign: "center" }}>
          Já tem conta? <Link to="/">Fazer login</Link>
        </p>
      </Card>
    </div>
  );
}
