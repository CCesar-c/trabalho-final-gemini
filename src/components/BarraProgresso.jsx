// Barra de progresso reutilizável: recebe valor atual e máximo por
// props e calcula a porcentagem preenchida.
export default function BarraProgresso({ valor, maximo, rotulo }) {
  const percentual = maximo > 0 ? Math.min(100, (valor / maximo) * 100) : 0;

  return (
    <div>
      {rotulo && (
        <div className="text-suave" style={{ fontSize: 13, marginBottom: 6 }}>
          {rotulo}
        </div>
      )}
      <div className="progresso">
        <div className="progresso__preenchimento" style={{ width: `${percentual}%` }} />
      </div>
    </div>
  );
}
