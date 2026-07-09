// Mensagem de erro reutilizável para chamadas de API que falharem
// (timeout, servidor fora do ar, etc.).
export default function MensagemErro({ mensagem }) {
  if (!mensagem) return null;
  return <div className="mensagem-erro">{mensagem}</div>;
}
