// Componente reutilizável exibido enquanto uma requisição está em
// andamento. A mensagem muda por props (ex.: "Carregando trilha...",
// "IA analisando resposta...").
export default function Loading({ mensagem = "Carregando..." }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__spinner" />
      <span>{mensagem}</span>
    </div>
  );
}
