// Componente reutilizável de cartão: qualquer tela pode envolver seu
// conteúdo neste "container" visual padronizado, passando um título
// opcional por props.
export default function Card({ titulo, children, style }) {
  return (
    <div className="card" style={style}>
      {titulo && <h2 className="card__titulo">{titulo}</h2>}
      {children}
    </div>
  );
}
