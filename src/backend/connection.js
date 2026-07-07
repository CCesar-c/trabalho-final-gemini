const { Pool } = require("pg");

export const conexao = new Pool({
  host: "localhost",
  user: "postgres",
  senha: "senai",
  database: "final_ia_trabalho",
  port: 5433,
});
