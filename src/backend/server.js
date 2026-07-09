require("dotenv/config");

const { conexao } = require("./connection.js");
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// Helper: aplica timeout a qualquer chamada assíncrona (evita requisição travada para sempre)
function comTimeout(promise, ms = 15000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT_GEMINI")), ms)
    ),
  ]);
}

// 1. RUTA DE DIAGNÓSTICO
app.post("/diagnostico", (req, res) => {
  const { id_estudante, diagnostico } = req.body;

  if (!id_estudante || !diagnostico) {
    return res.status(400).json({
      error: 'Os campos "id_estudante" e "diagnostico" são obrigatórios no corpo da requisição.',
    });
  }

  const gemini = async () => {
    try {
      const promptSistema = `Você é um orientador pedagógico do SENAI. Analise o seguinte diagnóstico técnico do estudante: "${diagnostico}".
      Com base nas lacunas identificadas, gere uma trilha de estudos personalizada com exatamente 5 tópicos obrigatórios ordenados por nível de dificuldade.
      Retorne OBRIGATORIAMENTE uma lista no seguinte formato JSON: 
      [{"id": 1, "nome_topico": "Nome do Tema 1"}, {"id": 2, "nome_topico": "Nome do Tema 2"}]`;

      const response = await comTimeout(
        ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: promptSistema,
          config: { responseMimeType: "application/json" },
        })
      );

      const trilhaJson = response.text;

      const resultadoBanco = await conexao.query(
        "INSERT INTO trilhas (nome_trilha, id_estudante, temas_ia) VALUES ($1, $2, $3) RETURNING *",
        ["Trilha Adaptativa DESI", id_estudante, trilhaJson]
      );

      return res.json({
        sucesso: true,
        dados_trilha: resultadoBanco.rows[0],
      });
    } catch (error) {
      console.error("Erro ao se comunicar com o Gemini ou Banco:", error);

      if (error.message === "TIMEOUT_GEMINI") {
        return res.status(504).json({ error: "A IA demorou demais para responder. Tente novamente." });
      }
      if (error.status === 429 || error.code === 429) {
        return res.status(429).json({ error: "Limite de requisições à IA atingido. Aguarde e tente novamente." });
      }
      return res.status(500).json({
        error: "Erro interno ao processar a requisição com a IA ou persistência.",
      });
    }
  };
  gemini();
});

// 2. RUTA DE ESTUDIANTE
app.post("/estudante", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }

  const salvarEstudante = async () => {
    try {
      const request = await conexao.query(
        "INSERT INTO estudantes (nome, email) VALUES ($1, $2) RETURNING *",
        [nome, email]
      );
      res.json(request.rows);
    } catch (error) {
      console.error("Erro ao inserir estudante:", error);
      res.status(500).json({ error: "Erro ao registrar o estudante no banco de dados." });
    }
  };
  salvarEstudante();
});

// 3. RUTA DE CONSULTA TRILHA
app.post("/consulta_trilha", (req, res) => {
  const { id_estudante } = req.body;

  if (!id_estudante) {
    return res.status(400).json({ error: "O campo id_estudante é obrigatório." });
  }

  const buscarTrilha = async () => {
    try {
      const request = await conexao.query(
        "SELECT * FROM trilhas WHERE id_estudante = $1 ORDER BY creado_en DESC LIMIT 1",
        [id_estudante]
      );

      if (request.rows.length === 0) {
        return res.status(404).json({ error: "Nenhuma trilha encontrada para este estudante." });
      }

      res.json(request.rows);
    } catch (error) {
      console.error("Erro ao consultar trilha:", error);
      res.status(500).json({ error: "Erro ao buscar a trilha no banco de dados." });
    }
  };
  buscarTrilha();
});

// 4. RUTA DE EVOLUCIÓN
app.post("/evolucao", (req, res) => {
  const { id_estudante, notas, feedback_ia } = req.body;

  if (!id_estudante || notas === undefined || !feedback_ia) {
    return res.status(400).json({ error: "Campos id_estudante, notas e feedback_ia são obrigatórios." });
  }

  const salvarProgresso = async () => {
    try {
      const estado_aprovacao = notas >= 7 ? "Aprovado" : "Reprovado";

      const request = await conexao.query(
        "INSERT INTO progresso (id_estudante, notas, feedback_ia, estado_aprovacao) VALUES ($1, $2, $3, $4) RETURNING *",
        [id_estudante, notas, feedback_ia, estado_aprovacao]
      );

      res.json({
        sucesso: true,
        progresso_salvo: request.rows,
      });
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
      res.status(500).json({ error: "Erro ao registrar a evolução no banco de dados." });
    }
  };
  salvarProgresso();
});

// 5. RUTA DE HISTÓRICO (usada pelo Painel.jsx)
app.get("/api/historico/:id_estudante", (req, res) => {
  const { id_estudante } = req.params;

  const buscarHistorico = async () => {
    try {
      const request = await conexao.query(
        "SELECT * FROM progresso WHERE id_estudante = $1 ORDER BY creado_en ASC",
        [id_estudante]
      );
      res.json(request.rows);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      res.status(500).json({ error: "Erro ao buscar o histórico do estudante." });
    }
  };
  buscarHistorico();
});

app.listen(port, () => {
  console.log("Esta funcionando em http://localhost:" + port);
});