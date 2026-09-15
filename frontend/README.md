# Frontend de autenticação — template-esqueleto

Este projeto foi feito para aulas do 3º ano do Ensino Médio Técnico em Informática. As telas, os formulários, as rotas e as funções já existem. A integração com o backend foi deixada com comentários `TODO` para que alunos e professor a construam juntos. Ao instalar o projeto, as telas públicas abrem, mas cadastro, login, consulta do perfil e logout **ainda não funcionam**. A rota `/protegida` redireciona para `/login` até que a leitura do token seja completada.

## Tecnologias e estrutura

O frontend usa React, Vite, React Router DOM, Axios, Tailwind CSS v4 e JavaScript. Não usa TypeScript, Redux, Context API, bibliotecas de UI, cookies ou refresh token.

```text
src/
  components/
    ProtectedRoute.jsx
  pages/
    Register.jsx
    Login.jsx
    ProtectedPage.jsx
  services/
    api.js
    auth.js
  App.jsx
  main.jsx
  index.css
.env.example
index.html
package.json
vite.config.js
README.md
```

`src/main.jsx` inicia o React e o `BrowserRouter`. `src/App.jsx` define as rotas. `src/services/api.js` cria a instância `api` do Axios com a URL base do backend. `src/services/auth.js` concentra as funções didáticas para o token.

## Instalação e execução

Instale o Node.js compatível com a versão do Vite declarada em `package.json`. Na raiz do projeto, execute:

```bash
npm install
cp .env.example .env
npm run dev
```

No PowerShell, o equivalente a `cp .env.example .env` é `Copy-Item .env.example .env`. O arquivo `.env` deve conter:

```env
VITE_API_URL=http://localhost:3000
```

O Vite lê variáveis iniciadas por `VITE_` e as disponibiliza em `import.meta.env`. Reinicie `npm run dev` após editar o `.env`. Rode também o backend Node.js/Express em `http://localhost:3000` antes de testar as integrações em aula. Se o navegador bloquear uma chamada entre as portas do frontend e do backend, confira a configuração de CORS no backend.

## Tailwind CSS v4

O Tailwind v4 usa os pacotes `tailwindcss` e `@tailwindcss/vite`. Para instalá-los em um projeto Vite, o comando é:

```bash
npm install tailwindcss @tailwindcss/vite
```

Neste template, ambos já estão declarados em `package.json` e são instalados pelo `npm install` inicial. `vite.config.js` registra os plugins `react()` e `tailwindcss()`. `src/index.css` contém `@import "tailwindcss";`, e esse CSS é importado por `src/main.jsx`. As classes utilitárias são usadas diretamente no JSX para fundo cinza claro, cards brancos, botões azuis, campos com borda, mensagens vermelhas ou verdes e layout responsivo básico.

No Tailwind v3, era comum usar três diretivas separadas (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) e arquivos de configuração JavaScript/PostCSS. Na configuração atual do v4 com Vite, usamos o plugin oficial e um único `@import "tailwindcss";`. Por isso, este projeto não precisa de `tailwind.config.js` nem `postcss.config.js`. Consulte a [documentação oficial do Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite) para conferir a configuração.

## Páginas e funções preparadas

| Arquivo | O que já existe | O que falta completar em aula |
| --- | --- | --- |
| `pages/Register.jsx` | Campos de nome, email e senha; estados `name`, `email`, `password`, `error`, `success`, `loading`; `handleRegister` | Validação, `api.post("/auth/register", ...)`, feedback e limpeza dos campos |
| `pages/Login.jsx` | Campos de email e senha; estados `email`, `password`, `error`, `loading`; `handleLogin` e `useNavigate` | `api.post("/auth/login", ...)`, leitura do token, `saveToken`, feedback e navegação |
| `pages/ProtectedPage.jsx` | Espaço para ID, nome e email; estados `user`, `error`, `loading`; `loadProfile`, `handleLogout` e `useEffect` | Leitura do token, `api.get("/users/profile", ...)`, header, tratamento de erro e logout |
| `components/ProtectedRoute.jsx` | Estrutura para redirecionar sem token e renderizar a página com token | Revisar `isAuthenticated()` após implementar a leitura do token |
| `services/auth.js` | `saveToken(token)`, `getToken()`, `removeToken()` e `isAuthenticated()` | Completar as operações com `localStorage` |

Os comentários `TODO` dentro das funções indicam a sequência de trabalho. `handleRegister` e `handleLogin` já impedem o recarregamento padrão do formulário; as demais etapas foram deixadas para a aula. `loadProfile` já é chamado pelo `useEffect` ao abrir a página, mas ainda não faz uma requisição. `getToken()` retorna `null` e `isAuthenticated()` retorna `false` provisoriamente, então a proteção da rota ainda não permite entrar. O botão **Sair** também está pronto na interface, mas `handleLogout` ainda precisa remover o token e navegar para `/login`.

## Fluxo esperado, a implementar em aula

1. Usuário acessa `/register` e cria uma conta.
2. Frontend envia os dados para `POST /auth/register`.
3. Backend salva o usuário com senha hasheada.
4. Usuário acessa `/login`.
5. Frontend envia email e senha para `POST /auth/login`.
6. Backend valida o login e retorna um token.
7. Frontend salva o token no `localStorage` com a chave `auth_token`.
8. Usuário é redirecionado para `/protegida`.
9. A página protegida pega o token salvo.
10. A página protegida envia o token no header `Authorization: Bearer TOKEN_AQUI`.
11. Backend valida o token no middleware.
12. Se o token for válido, backend retorna os dados do usuário.
13. Frontend mostra que o login foi feito com sucesso e exibe ID, nome e email.

No cadastro, a turma completará a validação dos campos, o corpo `{ name, email, password }`, as mensagens de sucesso ou erro e a limpeza do formulário. No login, completará o corpo `{ email, password }`, verificará onde o backend coloca o token na resposta e chamará `saveToken`. Na página protegida, completará `loadProfile` para ler o token, enviar `GET /users/profile` com `Authorization: Bearer ${token}`, salvar o usuário em `user` e tratar token inválido. No logout, chamará `removeToken` e redirecionará para `/login`.

Guardar e enviar o token no frontend permite controlar a navegação, mas isso não substitui a segurança do backend. `ProtectedRoute` só melhora a experiência de quem usa a aplicação. A proteção real é o middleware do backend, que deve validar o JWT a cada requisição protegida, mesmo se alguém tentar acessar a API diretamente ou burlar o frontend.

Para adaptar ao TCC, a turma pode trocar títulos e cores, incluir campos próprios no cadastro, criar páginas específicas do tema e mudar `VITE_API_URL` para o endereço da API do projeto. Ao alterar o contrato da API, revisem também os caminhos das rotas, os nomes dos campos e o formato da resposta do login e do perfil.

## Checklist dos alunos

- [ ] Rodei o backend
- [ ] Rodei o frontend
- [ ] Configurei VITE_API_URL
- [ ] Entendi a estrutura do frontend
- [ ] Entendi onde fica a configuração do axios
- [ ] Completei o cadastro no frontend
- [ ] Enviei POST /auth/register pelo frontend
- [ ] Completei o login no frontend
- [ ] Recebi o token do backend
- [ ] Salvei o token no localStorage
- [ ] Completei a página protegida
- [ ] Enviei Authorization: Bearer TOKEN para o backend
- [ ] Recebi os dados do usuário logado
- [ ] Implementei logout
- [ ] Entendi que o frontend apenas guarda e envia o token
- [ ] Entendi que quem valida de verdade é o backend
