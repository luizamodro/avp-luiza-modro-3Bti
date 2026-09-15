const TOKEN_KEY = "auth_token";

export function saveToken(token) {
  // TODO: salvar o token no localStorage usando a chave auth_token.
  // Sugestão para estudar: localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  // TODO: buscar o token no localStorage usando a chave auth_token.
  // Sugestão para estudar: return localStorage.getItem(TOKEN_KEY);
  return null;
}

export function removeToken() {
  // TODO: remover o token do localStorage usando a chave auth_token.
  // Sugestão para estudar: localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  // TODO: verificar se existe token salvo usando getToken().
  // Sugestão para estudar: return Boolean(getToken());
  return false;
}
