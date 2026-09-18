import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token ausente" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
