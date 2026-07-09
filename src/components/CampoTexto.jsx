// Campo de formulário controlado e reutilizável.
// O valor sempre vem do estado do componente pai (props) e qualquer
// mudança sobe através do callback onChange — nunca guarda estado
// próprio, para respeitar o padrão de "componente controlado".
export default function CampoTexto({
  label,
  tipo = "text",
  valor,
  onChange,
  placeholder,
  obrigatorio = false,
  disabled = false,
  multilinha = false,
  linhas = 5,
}) {
  return (
    <div className="campo">
      {label && <label>{label}</label>}
      {multilinha ? (
        <textarea
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={obrigatorio}
          disabled={disabled}
          rows={linhas}
        />
      ) : (
        <input
          type={tipo}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={obrigatorio}
          disabled={disabled}
        />
      )}
    </div>
  );
}
