const { Pool } = require("pg");
require("dotenv/config");

const conexao = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "final_ia_trabalho",
  port: process.env.DB_PORT || 5433,
});

module.exports = { conexao };