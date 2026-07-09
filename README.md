# Plataforma de Aprendizagem Adaptativa com IA

Projeto Final — Módulo 5 · Desenvolvimento de Sistemas (DESI) · SENAI

Plataforma web onde a IA (Google Gemini) atua como orientador pedagógico:
diagnostica o estudante, gera uma trilha de estudos personalizada, avalia
respostas e acompanha o progresso.

## Stack

- **Front-end:** React 19 + Vite, React Router DOM, Axios
- **Back-end:** Node.js + Express, Axios (interno), SDK `@google/genai`
- **Banco de dados:** PostgreSQL
- **IA:** Google Gemini (`gemini-2.0-flash`)

## Estrutura do projeto

- src/
- components/ # componentes reutilizáveis
- pages/ # uma tela por rota (Entrada, Diagnostico, Trilha, Topico, Painel, Cadastro)
- contexts/ # Context API (EstudanteContext)
- data/ # configuração do Axios (api.js)
- backend/ # servidor Node.js + Express + PostgreSQL + Gemini

## Pré-requisitos

- Node.js 20+
- PostgreSQL rodando localmente (ou remoto)
- Uma chave de API do Gemini ([Google AI Studio](https://aistudio.google.com/apikey))

## Configuração do banco de dados

Rode o script `.sql` na raiz do projeto para criar as tabelas
(`estudantes`, `trilhas`, `progresso`).

## Instalação e execução

### 1. Front-end

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

### 2. Back-end

```bash
cd src/backend
npm install
```

Crie o arquivo `src/backend/.env` com:
PORT=3000
GEMINI_API_KEY=sua_chave_aqui
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=final_ia_trabalho
DB_PORT=5433
Depois rode:

```bash
npm start
```

O servidor sobe em `http://localhost:3000`.

## Rotas do front-end

| Rota           | Tela                                 |
| -------------- | ------------------------------------ |
| `/`            | Identificação do estudante           |
| `/cadastro`    | Cadastro de novo estudante           |
| `/diagnostico` | Questionário diagnóstico             |
| `/trilha`      | Trilha de estudo (lista de tópicos)  |
| `/topico/:id`  | Conteúdo do tópico + avaliação da IA |
| `/painel`      | Painel de desempenho e histórico     |

## Endpoints do back-end

| Método | Rota                           | Descrição                                        |
| ------ | ------------------------------ | ------------------------------------------------ |
| POST   | `/estudante`                   | Cria um estudante                                |
| POST   | `/diagnostico`                 | Gera a trilha com Gemini a partir do diagnóstico |
| POST   | `/consulta_trilha`             | Busca a última trilha do estudante               |
| POST   | `/evolucao`                    | Salva nota/feedback de um tópico avaliado        |
| GET    | `/api/historico/:id_estudante` | Histórico de avaliações do estudante             |

## Conceitos de React aplicados

- Componentes funcionais e composição (`Card`, `FeedbackBox`, etc.)
- Props (pai → filho)
- `useState`, `useEffect` (com array de dependências)
- Renderização condicional (`&&` e ternário)
- Listas com `.map()` e `key`
- Formulários controlados (`onChange`, `onSubmit`, `preventDefault`)
- Elevação de estado
- Context API (`createContext`, `Provider`, `useContext`)
- React Router (`Routes`, `Route`, `Link`, `useNavigate`, `useParams`)
