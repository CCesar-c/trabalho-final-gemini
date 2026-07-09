-- ============================================================
-- Esquema do banco de dados — Plataforma de Aprendizagem
-- Adaptativa com IA
--
-- Como usar:
--   1. Crie o banco:  CREATE DATABASE final_ia_trabalho;
--   2. Conecte-se a ele e rode este arquivo inteiro
--      (ex.: psql -U postgres -d final_ia_trabalho -f schema.sql)
-- ============================================================

CREATE TABLE IF NOT EXISTS estudantes (
    id_estudante   SERIAL PRIMARY KEY,
    nome           VARCHAR(100) NOT NULL,
    email          VARCHAR(100) NOT NULL UNIQUE,
    data_registro  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trilhas (
    trilha_id     SERIAL PRIMARY KEY,
    nome_trilha   VARCHAR(50) NOT NULL,
    id_estudante  INT REFERENCES estudantes(id_estudante),
    temas_ia      JSONB DEFAULT '[]'::jsonb,
    creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS progresso (
    progresso_id      SERIAL PRIMARY KEY,
    id_estudante      INT REFERENCES estudantes(id_estudante),
    notas             INT NOT NULL,
    feedback_ia       TEXT NOT NULL,
    estado_aprovacao  VARCHAR(10) NOT NULL,
    creado_en         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para acelerar as consultas mais comuns do back-end
CREATE INDEX IF NOT EXISTS idx_trilhas_estudante ON trilhas(id_estudante);
CREATE INDEX IF NOT EXISTS idx_progresso_estudante ON progresso(id_estudante);
