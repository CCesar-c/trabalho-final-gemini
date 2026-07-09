// Componente reutilizável de botão.
// Recebe tudo via props para poder ser usado em qualquer tela
// (login, cadastro, diagnóstico, trilha, tópico, painel).
export default function Botao({
  children,
  onClick,
  type = "button",
  variante = "primario", // "primario" | "secundario" | "perigo"
  bloco = false,
  disabled = false,
  style,
}) {
  const classe = [
    "botao",
    `botao--${variante}`,
    bloco ? "botao--bloco" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classe} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}
