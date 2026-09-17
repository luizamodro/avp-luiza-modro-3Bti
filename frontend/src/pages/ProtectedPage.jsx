import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { getToken, removeToken } from "../services/auth.js";

export default function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


async function loadProfile() {
    const token = getToken()
    if (!token) {
      navigate("/login");
      return;
    }
    
    try {
      
      // TODO : ativar loading.
      setLoading(true);
      
      const response = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUser(response.data);
    } catch (error) {
      setError("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  }
    

  function loadProfile() {
    // TODO: pegar o token salvo no localStorage usando getToken.
    // TODO: se não existir token, redirecionar para /login.
    // TODO: ativar loading.
    // TODO: chamar GET /users/profile usando api.get.
    // TODO: enviar o token no header Authorization no formato Bearer TOKEN.
    // TODO: salvar os dados do usuário no estado user.
    // TODO: se o token for inválido, remover token e redirecionar para /login.
    // TODO: mostrar mensagem de erro se acontecer algum problema.
    // TODO: desativar loading no final.
    // Dica: api.get("/users/profile", { headers: { Authorization: `Bearer ${token}` } })
  }

  function handleLogout() {
    // TODO: remover o token usando removeToken.
    // TODO: redirecionar para /login.
  }

  useEffect(() => {
    // Este efeito prepara o carregamento do perfil quando a página abre.
    // Após completar loadProfile, a requisição acontecerá aqui.
    loadProfile();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <section className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">Área Protegida</h1>
        <p role="status" className="mb-5 rounded-md bg-green-50 p-3 text-center text-green-700">Login realizado com sucesso</p>

        {loading && <p role="status" className="mb-4 text-gray-600">Carregando perfil...</p>}
        {error && <p role="alert" className="mb-4 text-red-600">{error}</p>}

        <div className="mb-6 space-y-2 rounded-md border border-gray-200 p-4 text-gray-700">
          <h2 className="font-semibold text-gray-900">Dados do usuário</h2>
          <p><strong>ID:</strong> {user?.id ?? "Aguardando perfil"}</p>
          <p><strong>Nome:</strong> {user?.name ?? "Aguardando perfil"}</p>
          <p><strong>Email:</strong> {user?.email ?? "Aguardando perfil"}</p>
        </div>

        <button type="button" onClick={handleLogout} className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          Sair
        </button>
      </section>
    </main>
  );
}
