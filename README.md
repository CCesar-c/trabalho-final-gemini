# Plataforma de Aprendizagem Adaptativa com IA

Projeto Final — Módulo 5 · Desenvolvimento de Sistemas (DESI) · SENAI

Protótipo funcional de uma plataforma web onde a inteligência artificial
(Google Gemini) atua como orientador pedagógico: diagnostica o estudante,
gera uma trilha de estudos personalizada, avalia respostas por tópico e
acompanha o progresso ao longo do tempo.

## Stack

| Camada        | Tecnologia                                        |
|---------------|----------------------------------------------------|
| Front-end     | React 19 + Vite, React Router DOM, Axios          |
| Back-end      | Node.js + Express, SDK `@google/genai`            |
| Banco de dados| PostgreSQL                                        |
| IA            | Google Gemini (`gemini-2.0-flash`)                |

## Estrutura do projeto

```
.
├── src/
│   ├── components/    # componentes reutilizáveis (Botao, Card, Loading...)
│   ├── pages/         # uma tela por rota
│   ├── contexts/      # Context API (EstudanteContext)
│   ├── data/          # configuração do Axios (api.js)
│   ├── style/         # CSS global
│   ├── App.jsx        # definição das rotas
│   └── main.jsx        # ponto de entrada
├── backend/
│   ├── server.js       # rotas da API
│   ├── connection.js   # pool de conexão com o PostgreSQL
│   ├── package.json
│   └── .env.example
└── schema.sql          # script de criação das tabelas
```

## Pré-requisitos

- Node.js 20 ou superior
- PostgreSQL instalado e rodando (local ou remoto)
- Uma chave de API do Gemini — [Google AI Studio](https://aistudio.google.com/apikey)

## 1. Banco de dados

Crie o banco e rode o script de esquema:

```bash
createdb final_ia_trabalho
psql -U postgres -d final_ia_trabalho -f schema.sql
```

Isso cria as tabelas `estudantes`, `trilhas` e `progresso`.

## 2. Back-end

```bash
cd backend
npm install
cp .env.example .env
```

Abra o `.env` recém-criado e preencha:

```
PORT=3000
GEMINI_API_KEY=sua_chave_do_gemini
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sua_senha_do_postgres
DB_NAME=final_ia_trabalho
DB_PORT=5433
```

Depois rode o servidor:

```bash
npm start
```

O back-end sobe em `http://localhost:3000`. Para conferir que está no ar,
abra `http://localhost:3000` no navegador (ou use `curl`) — deve ver a
mensagem de log no terminal `Está funcionando em http://localhost:3000`.

## 3. Front-end

Em outro terminal, na raiz do projeto:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador. A cada alteração salva, a
página recarrega sozinha (hot reload).

> **Importante:** o back-end precisa estar rodando (passo 2) para que as
> telas consigam se comunicar com a API e com o Gemini.

## Rotas do front-end

| Rota           | Tela                                        |
|----------------|-----------------------------------------------|
| `/`            | Identificação do estudante (login rápido)     |
| `/cadastro`    | Cadastro de novo estudante                     |
| `/diagnostico` | Questionário diagnóstico                       |
| `/trilha`      | Trilha de estudo (lista de tópicos gerados)    |
| `/topico/:id`  | Conteúdo do tópico + avaliação pela IA         |
| `/painel`      | Painel de desempenho e histórico               |

## Endpoints do back-end

| Método | Rota                            | Descrição                                        |
|--------|----------------------------------|----------------------------------------------------|
| POST   | `/estudante`                     | Cria um estudante                                   |
| POST   | `/diagnostico`                   | Gera a trilha com o Gemini a partir do diagnóstico  |
| POST   | `/consulta_trilha`                | Busca a última trilha do estudante                  |
| POST   | `/evolucao`                       | Salva nota e feedback de um tópico avaliado         |
| GET    | `/api/historico/:id_estudante`    | Histórico de avaliações do estudante                |

Todas as rotas retornam `4xx`/`5xx` com uma mensagem em `error` quando
algo falha (campos obrigatórios ausentes, timeout do Gemini, limite de
requisições atingido, erro de banco de dados, etc.).

## Conceitos de React aplicados (checklist do projeto)

- ✅ SPA construída com Vite, navegável sem recarregar a página
- ✅ JSX em todos os componentes
- ✅ Componentes funcionais reutilizáveis (`Botao`, `Card`, `Loading`,
  `FeedbackBox`, `BarraProgresso`, `QuestaoCard`, `CampoTexto`,
  `ItemTrilha`, `EstadoVazio`, `MensagemErro`, `Menu`)
- ✅ Props (dados descendo do pai para o filho)
- ✅ Renderização condicional com `&&` e operador ternário
- ✅ Listas com `.map()` e `key` única (trilha e histórico)
- ✅ `useState` para respostas do estudante e estado da interface
- ✅ Eventos `onClick`, `onChange`, `onSubmit` + `preventDefault`
- ✅ Formulários controlados em todas as telas de entrada de dados
- ✅ Elevação de estado (o estudante e a trilha vivem no Context,
  compartilhados por várias telas)
- ✅ `useEffect` com array de dependências correto (refaz a busca do
  histórico/trilha quando o estudante muda)
- ✅ Consumo de API com Axios dentro de `useEffect`, tratando
  carregamento e erro
- ✅ React Router: `Routes`, `Route`, `Link`, `useNavigate`, `useParams`
- ✅ Context API: `createContext`, `Provider`, `useContext`

## Notas de implementação

- A nota da avaliação de cada tópico é simulada no front-end (número
  aleatório entre 5 e 10) apenas para fins de demonstração do fluxo;
  em uma versão de produção, o back-end enviaria a resposta do
  estudante ao Gemini para gerar a nota e o feedback de fato.
- Chamadas ao Gemini têm timeout de 15s e tratamento específico para
  erro 429 (limite de requisições), retornando mensagens compreensíveis
  ao front-end em vez de travar a tela.

AQ.Ab8RN6JX50uR5EZS7H4cSqOx4YdvLIAa0t4uaWkOUVie0-1HCg