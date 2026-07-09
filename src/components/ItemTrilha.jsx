import { Link } from "react-router-dom";

// Um item da lista de tópicos da trilha. Recebe o tópico por props
// e monta o link para /topico/:id preservando o nome na query string.
export default function ItemTrilha({ tema }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 16px",
        border: "1px solid var(--borda)",
        borderRadius: 9,
        marginBottom: 10,
        background: "#fff",
      }}
    >
      <span>
        <span className="badge" style={{ marginRight: 10 }}>
          Tópico {tema.id}
        </span>
        {tema.nome_topico}
      </span>
      <Link
        to={`/topico/${tema.id}?nome=${encodeURIComponent(tema.nome_topico)}`}
        className="botao botao--secundario"
        style={{ textDecoration: "none" }}
      >
        Estudar
      </Link>
    </div>
  );
}
