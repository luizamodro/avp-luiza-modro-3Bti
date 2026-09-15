import axios from "axios";

// Esta instância será usada para fazer requisições ao backend.
// A URL do backend vem do arquivo .env (VITE_API_URL).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
