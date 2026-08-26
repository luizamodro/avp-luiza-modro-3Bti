export async function getProfile(req, res) {
  // Quando o middleware estiver completo, ele colocará em req.user
  // os dados do usuário autenticado. Por isso a rota pode usar req.user.
  // Esta resposta só será alcançada depois que o middleware chamar next().
  return res.status(200).json({
    message: "Perfil acessado com sucesso",
    user: req.user,
  });
}
