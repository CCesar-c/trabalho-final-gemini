// Mostra o resultado de uma avaliação da IA.
// Usa renderização condicional (ternário) para trocar cor/selo
// entre "Aprovado" e "Reprovado" de acordo com a prop recebida.
export default function FeedbackBox({ nota, estadoAprovacao, feedback }) {
  const aprovado = estadoAprovacao === "Aprovado";

  return (
    <div className={`feedback ${aprovado ? "feedback--aprovado" : "feedback--reprovado"}`}>
      <p className="feedback__selo">
        {aprovado ? "✓ Aprovado" : "✗ Reprovado"} — nota {nota}
      </p>
      <p style={{ marginTop: 10, marginBottom: 0 }}>{feedback}</p>
    </div>
  );
}
