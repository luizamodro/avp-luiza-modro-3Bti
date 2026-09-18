import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { saveToken } from "../services/auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    const emailValue = email.trim();
    const passwordValue = password.trim();

    if (!emailValue || !passwordValue) {
      setError("Preencha email e senha para continuar.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: emailValue,
        password: passwordValue,
      });

      const token = response.data?.token;

      if (!token) {
        throw new Error("Token não recebido do servidor.");
      }

      saveToken(token);
      navigate("/protegida");
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.mensagem || "Erro ao fazer login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Entrar</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Senha</label>
            <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none" />
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Ainda não tem conta? <Link to="/register" className="font-medium text-blue-600 hover:underline">Criar conta</Link>
        </p>
      </section>
    </main>
  );
}
