import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import Botao from "../components/Botao.jsx";

export default function PageError({ error = "Página não encontrada" }) {
  return (
    <div className="container container--estreito">
      <Card>
        <p style={{ color: "var(--erro)", fontWeight: 600 }}>Erro 404</p>
        <p>{error}</p>
        <Link to="/">
          <Botao>Voltar para o início</Botao>
        </Link>
      </Card>
    </div>
  );
}
