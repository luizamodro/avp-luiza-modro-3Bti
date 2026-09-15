import bcrypt from "bcrypt";
import prisma from "../src/prismaClient.js";

async function main() {
  // A senha salva no banco nunca deve ser a senha pura.
  // O hash transforma a senha antes de ela ser armazenada.
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { email: "aluno@email.com" },
    update: {
      name: "Aluno Teste",
      password: hashedPassword,
    },
    create: {
      name: "Aluno Teste",
      email: "aluno@email.com",
      password: hashedPassword,
    },
  });

  console.log("Seed executado: usuário de teste criado ou atualizado.");
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
