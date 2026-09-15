# Template didático de autenticação com Node.js

## 1. Objetivo do projeto

Este projeto é uma base para a aula prática de Desenvolvimento de Sistemas Web do 3º ano do Ensino Médio Técnico em Informática. O objetivo é aprender o fluxo:

**cadastro → hash de senha → login → sessão/token → middleware → rota protegida**

As partes principais da autenticação contêm `TODOs`. Elas não estão prontas: serão implementadas pelos alunos durante a aula e depois poderão ser adaptadas aos projetos de TCC.

## 2. Tecnologias usadas

- Node.js e Express
- ES Modules (`import` e `export`)
- Prisma ORM e MySQL
- bcrypt
- jsonwebtoken (JWT)
- dotenv
- cors
- nodemon

## 3. Estrutura de pastas

```text
src/
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── prismaClient.js
├── app.js
└── server.js
prisma/
├── schema.prisma
└── seed.js
.env.example
.gitignore
package.json
README.md
```

## 4. Como instalar as dependências

Tenha o Node.js e um servidor MySQL instalados. No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

## 5. Como configurar o `.env`

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

No PowerShell, se `cp` não funcionar, use `Copy-Item .env.example .env`.

Depois, abra o `.env` e troque usuário, senha, host e nome do banco conforme sua instalação do MySQL:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/template_auth_tcc"
JWT_SECRET="troque_essa_chave"
JWT_EXPIRES_IN="1d"
PORT=3000
```

O arquivo `.env` contém dados privados e não deve ser enviado ao Git. O `.env.example` mostra apenas o formato esperado.

## 6. Como criar o banco com Prisma

Com o MySQL funcionando e o `.env` configurado, execute:

```bash
npx prisma migrate dev --name init
```

Esse comando cria as tabelas descritas em `prisma/schema.prisma` e gera o Prisma Client.

## 7. Como rodar o seed

```bash
npx prisma db seed
```

O seed cria ou atualiza este usuário de teste:

- Email: `aluno@email.com`
- Senha: `123456`

A senha não é salva pura: o seed usa o bcrypt para gerar seu hash.

## 8. Como iniciar o servidor

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`. O nodemon reinicia o servidor quando um arquivo é alterado.

## 9. Como testar as rotas

Use Insomnia, Postman ou outra ferramenta de requisições HTTP.

### Testar a API

`GET http://localhost:3000/health`

Resposta esperada:

```json
{
  "status": "ok",
  "message": "API funcionando"
}
```

### Cadastro

`POST http://localhost:3000/auth/register`

```json
{
  "name": "Ana Souza",
  "email": "ana@email.com",
  "password": "123456"
}
```

### Login

`POST http://localhost:3000/auth/login`

```json
{
  "email": "ana@email.com",
  "password": "123456"
}
```

### Perfil protegido

`GET http://localhost:3000/users/profile`

Depois de completar o login, envie o token no cabeçalho:

```text
Authorization: Bearer SEU_TOKEN_AQUI
```

Enquanto os `TODOs` não forem completados, cadastro, login e middleware respondem com status `501`, indicando que são exercícios ainda não implementados.

## 10. O que é hash de senha?

Hash é o resultado de uma transformação de mão única. Em vez de salvar `123456` no banco, usamos o bcrypt para guardar um valor transformado. Não precisamos descobrir a senha a partir do hash: no login, o bcrypt verifica se a senha digitada corresponde ao hash salvo.

## 11. O que é login?

Login é o processo de confirmar a identidade do usuário. O backend busca o email e compara a senha digitada com o hash armazenado. Se a comparação estiver correta, o usuário é autenticado.

## 12. O que é token JWT?

JWT é um texto assinado pelo backend que pode guardar informações mínimas, como o `id` do usuário. A assinatura permite verificar se o token foi realmente criado pela API e se não foi alterado. Senhas nunca devem ser colocadas no token.

## 13. O que é sessão no contexto da API?

Neste projeto, o token funciona como uma sessão da API. Depois do login, o cliente guarda o token e o envia nas próximas requisições. Assim, o usuário prova que já realizou o login. O token tem tempo de validade definido por `JWT_EXPIRES_IN`.

## 14. O que é middleware?

Middleware é uma função que fica no meio do caminho entre a requisição e a resposta.

Quando o usuário tenta acessar uma rota, o Express pode executar primeiro um middleware. Esse middleware pode:

- deixar a requisição continuar;
- bloquear a requisição;
- modificar a requisição;
- adicionar informações na requisição.

No caso da autenticação, o middleware funciona como um **porteiro**. Ele verifica se o usuário enviou um token válido. Se o token for válido, chama `next()` e deixa a rota continuar. Se o token não existir ou for inválido, bloqueia o acesso.

```text
requisição do usuário
        ↓
middleware verifica o token
        ↓
se estiver correto, chama next()
        ↓
rota protegida é executada
```

Se o middleware não chamar `next()`, a rota final não será executada. Quando completo, nosso middleware também buscará o usuário e o colocará em `req.user`, para que a rota seguinte saiba quem está autenticado.

## 15. O que é rota protegida?

É uma rota que só pode ser acessada por um usuário autenticado. Antes de executar o controller da rota, o Express executa o middleware:

```js
router.get("/profile", authMiddleware, getProfile);
```

Primeiro roda `authMiddleware`. Somente quando ele chama `next()` o Express executa `getProfile`.

## Fluxo completo de autenticação

1. O usuário se cadastra.
2. A senha não deve ser salva pura.
3. A senha deve virar um hash.
4. No login, o sistema compara a senha digitada com o hash salvo.
5. Se estiver correto, o backend gera um token.
6. Esse token funciona como uma sessão.
7. Para acessar uma rota protegida, o usuário envia o token.
8. O middleware verifica o token.
9. Se o token for válido, a rota é liberada.
10. Se o token estiver ausente ou inválido, o acesso é bloqueado.

## 16. Partes que os alunos precisam completar

No `authController.js`:

- buscar usuário existente no cadastro;
- gerar o hash da senha;
- cadastrar o usuário no banco;
- devolver o usuário sem a senha;
- buscar usuário no login;
- comparar a senha digitada com o hash;
- gerar o JWT;
- devolver token e dados básicos.

No `authMiddleware.js`:

- ler o cabeçalho `Authorization`;
- verificar e separar o token;
- validar o JWT;
- buscar o usuário correspondente;
- adicionar o usuário em `req.user`;
- chamar `next()`.

Depois de cada implementação, trate também casos como email já cadastrado, usuário inexistente, senha incorreta, token ausente e token inválido.

## 17. Checklist da aula

- [ ] Rodei a API
- [ ] Acessei GET /health
- [ ] Entendi a estrutura de pastas
- [ ] Entendi o que é middleware
- [ ] Completei a busca de usuário no cadastro
- [ ] Completei o hash da senha no cadastro
- [ ] Completei o cadastro no banco
- [ ] Completei a busca de usuário no login
- [ ] Completei a comparação de senha
- [ ] Completei a geração do token
- [ ] Completei a leitura do token no middleware
- [ ] Completei a validação do token
- [ ] Completei o req.user
- [ ] Testei a rota protegida sem token
- [ ] Testei a rota protegida com token válido
- [ ] Pensei quais rotas do meu TCC precisam ser protegidas

## 18. Como adaptar para o TCC

Cada grupo deve identificar:

- quais usuários o sistema terá;
- quais rotas serão públicas;
- quais rotas exigirão login;
- quais dados pertencem ao usuário logado;
- quais funcionalidades só devem funcionar depois do login.

Exemplos de rotas públicas:

- `POST /auth/register`
- `POST /auth/login`
- `GET /produtos`

Exemplos de rotas protegidas:

- `GET /perfil`
- `POST /pedidos`
- `GET /meus-agendamentos`
- `POST /comentarios`

Por exemplo, ao criar um pedido, a API pode usar `req.user.id` para relacionar o pedido ao usuário autenticado. Esta primeira versão trabalha somente com autenticação e ainda não diferencia usuários administradores.

## 19. Próxima evolução: roles e admin

Depois que cadastro, login, sessão/token e middleware estiverem funcionando, o projeto poderá evoluir para:

- adicionar o campo `role` no usuário;
- criar usuários comuns e administradores;
- criar middleware de autorização;
- criar rotas acessíveis apenas por admin;
- aplicar permissões nas rotas reais do TCC.

Roles e admin não estão implementados nesta versão. Primeiro é importante dominar o fluxo básico de autenticação.
