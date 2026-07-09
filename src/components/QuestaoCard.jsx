import CampoTexto from "./CampoTexto.jsx";
import Botao from "./Botao.jsx";

// Encapsula a pergunta de verificação de um tópico: recebe o
// enunciado, o valor da resposta e os callbacks por props, para
// poder ser reaproveitado em qualquer tópico da trilha.
export default function QuestaoCard({
  enunciado,
  resposta,
  onChangeResposta,
  onSubmit,
  carregando,
}) {
  return (
    <form onSubmit={onSubmit}>
      <label style={{ display: "block", marginBottom: 10, fontWeight: 600 }}>
        {enunciado}
      </label>
      <CampoTexto
        valor={resposta}
        onChange={onChangeResposta}
        placeholder="Digite sua resposta técnica aqui..."
        obrigatorio
        disabled={carregando}
        multilinha
        linhas={5}
      />
      <Botao type="submit" disabled={carregando}>
        {carregando ? "IA analisando resposta..." : "Enviar avaliação"}
      </Botao>
    </form>
  );
}
