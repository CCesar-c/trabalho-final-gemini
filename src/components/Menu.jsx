import { Link, useLocation } from "react-router-dom";
import { useEstudante } from "../contexts/EstudanteContext.jsx";

// Menu de navegação: usa <Link> (nunca <a href>) para trocar de tela
// sem recarregar a página, e destaca a rota atual.
export default function Menu() {
  const { estudante, sair } = useEstudante();
  const local = useLocation();

  function ativo(rota) {
    return local.pathname === rota ? "ativo" : undefined;
  }

  return (
    <nav className="menu">
      <div className="menu__conteudo">
        <Link to="/" className="menu__marca">
          aprendizagem( )
        </Link>
        <div className="menu__links">
          <Link to="/" className={ativo("/")}>
            Entrada
          </Link>
          <Link to="/diagnostico" className={ativo("/diagnostico")}>
            Diagnóstico
          </Link>
          <Link to="/trilha" className={ativo("/trilha")}>
            Trilha
          </Link>
          <Link to="/painel" className={ativo("/painel")}>
            Painel
          </Link>
          {estudante && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                sair();
              }}
            >
              Sair ({estudante.nome})
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
