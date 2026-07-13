import axios from "axios";

// Ponto único de configuração do Axios: todas as telas importam esta
// mesma instância, então a URL do back-end só é definida uma vez aqui.
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 35000, // evita que a tela fique "presa" caso o back-end trave
});

export default api;
