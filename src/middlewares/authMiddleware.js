// Estas dependências serão usadas quando os TODOs forem completados em aula.
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export default async function authMiddleware(req, res, next) {
  // Middleware é uma função que fica no meio do caminho entre a requisição
  // e a resposta. O Express executa esta função antes da rota protegida.
  //
  // Aqui vamos verificar se o usuário está logado.
  // Se estiver logado, chamamos next() e deixamos a rota continuar.
  // Se não estiver, enviamos uma resposta e bloqueamos o acesso.
  //
  // O middleware funciona como um porteiro: ele pode deixar a requisição
  // continuar, bloquear, modificar ou adicionar informações nela.
  // Se ele não chamar next(), a função final da rota não será executada.

  // TODO: ler o header Authorization

  // TODO: verificar se o token foi enviado

  // TODO: separar a palavra Bearer do token

  // TODO: validar o token usando jwt.verify

  // TODO: buscar o usuário no banco pelo id que veio no token

  // TODO: adicionar o usuário na requisição usando req.user

  // TODO: chamar next() para liberar a rota protegida

  return res.status(501).json({
    message: "Middleware de autenticação ainda será implementado pelos alunos",
  });
}
