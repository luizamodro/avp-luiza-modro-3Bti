import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleRegister(event) {
    // TODO: impedir o comportamento padrão do formulário.
    event.preventDefault(); // Preparação mínima: a página não recarrega durante a aula.
    // TODO: limpar mensagens anteriores de erro e sucesso.
    // TODO: validar se name, email e password foram preenchidos.
    // TODO: ativar loading.
    // TODO: chamar POST /auth/register usando api.post.
    // TODO: enviar name, email e password no body.
    // TODO: mostrar mensagem de sucesso se o cadastro funcionar.
    // TODO: limpar os campos após cadastro.
    // TODO: mostrar mensagem de erro se o backend retornar erro.
    // TODO: desativar loading no final.
    // Dica: use try/catch/finally para separar sucesso, erro e loading.
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Criar conta</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
            <input id="name" name="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Senha</label>
            <input id="password" name="password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none" />
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          {success && <p role="status" className="text-sm text-green-600">{success}</p>}

          <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Já tem conta? <Link to="/login" className="font-medium text-blue-600 hover:underline">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
