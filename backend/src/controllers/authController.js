// Estas bibliotecas serão usadas quando os TODOs forem completados em aula.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Nome, email e senha são obrigatórios"
      });
    }

    // TODO: verificar se já existe usuário com este email
    // Dica: use prisma.user.findUnique e o campo email.

    const usuarioExiste = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (usuarioExiste) {
      return res.status(400).json({
        mensagem: "E-mail já cadastrado"
      });
    }

    // TODO: gerar o hash da senha usando bcrypt.hash
    // Dica: não salve a variável password diretamente no banco.

    const senhaHash = await bcrypt.hash(password, 10);

    // TODO: salvar o usuário no banco com a senha hasheada
    // Dica: use prisma.user.create.

    const usuario = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: senhaHash
      }
    });

    // TODO: retornar os dados do usuário sem a senha

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios"
      });
    }

    // TODO: buscar usuário pelo email
    // Dica: use prisma.user.findUnique.

    const usuario = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!usuario) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos"
      });
    }

    // TODO: comparar a senha digitada com o hash salvo no banco
    // Dica: use bcrypt.compare.

    const senhaValida = await bcrypt.compare(password, usuario.password);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos"
      });
    }

    // Neste projeto, o token funciona como uma sessão.
    // Depois do login, o usuário envia esse token para provar que está autenticado.

    const token = jwt.sign(
      {
        id: usuario.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    // TODO: gerar token JWT com o id do usuário
    // Dica: use jwt.sign, JWT_SECRET e JWT_EXPIRES_IN.

    // TODO: retornar token e dados do usuário

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token: token,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        password: usuario.password
      }
    });

    return res.status(501).json({
      message: "Login ainda será implementado pelos alunos"
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
