try {
  import "dotenv/config";

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
    apiKey: "",
  });

  app.post("/diagnostico", (req, res) => {
    const { diagnostico } = req.body;

    console.log(diagnostico);

    if (!diagnostico) {
      return res.status(400).json({
        error: 'O campo "diagnostico" é obrigatório no corpo da requisição.',
      });
    }
    // executa sozinho
    const gemini = async () => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: diagnostico,
          config: {
            responseMimeType: "application/json",
          },
        });

        return res.json({
          sucesso: true,
          resposta: response.text,
        });
      } catch (error) {
        console.error("Erro ao se comunicar com o Gemini:", error);
        return res.status(500).json({
          error: "Erro interno ao processar a requisição com a IA.",
        });
      }
    };
    gemini();
  });
  app.post("/estudante", (req, res) => {
    const { nome, email } = req.body;
    const response = async () => {
      const request = await conexao.query(
        "insert into estudantes values (default, $1, $2, default) returning *",
      );
      res.json(res.rows);
    };
    response();
  });
  app.post("/consulta_trilha", (req, res) => {
    const { res } = req.body;
  });

  app.post("/evolucao", (req, res) => {
    const { res } = req.body;
  });

  app.listen(port, () => {
    console.log("Esta funcionando em http://localhost:" + port);
  });
} catch (error) {
  console.log(error);
}
