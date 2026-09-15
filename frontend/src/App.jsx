import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProtectedPage from "./pages/ProtectedPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* /register e /login são páginas públicas. */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* /protegida deve exigir token. ProtectedRoute bloqueará a navegação sem ele. */}
      <Route
        path="/protegida"
        element={
          <ProtectedRoute>
            <ProtectedPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
