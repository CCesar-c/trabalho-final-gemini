// Estado "vazio" reutilizável — usado no Painel (sem histórico ainda)
// e pode ser reaproveitado em qualquer outra lista sem itens.
export default function EstadoVazio({ mensagem }) {
  return <div className="estado-vazio">{mensagem}</div>;
}
