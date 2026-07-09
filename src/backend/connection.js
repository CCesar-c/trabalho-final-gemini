require("dotenv").config();
const { Pool } = require("pg");

// Toda a configuração vem do .env (nunca hardcoded), incluindo a senha,
// que antes usava a propriedade errada ("senha" em vez de "password").
const conexao = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "senai",
  database: process.env.DB_NAME || "final_ia_trabalho",
  port: Number(process.env.DB_PORT) || 5433,
});

conexao.on("error", (erro) => {
  console.error("Erro inesperado na conexão com o PostgreSQL:", erro);
});

module.exports = { conexao };
