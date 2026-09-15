import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth.js";

export default function ProtectedRoute({ children }) {
  // TODO: revisar isAuthenticated() em auth.js para verificar o token salvo.
  const hasToken = isAuthenticated();

  // Esta proteção no frontend serve apenas para melhorar a navegação.
  // A proteção real acontece no backend, no middleware.
  // Mesmo que alguém tente burlar o frontend, o backend ainda deve validar o token.
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
