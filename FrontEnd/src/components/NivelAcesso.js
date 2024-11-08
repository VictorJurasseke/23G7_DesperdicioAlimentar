export const NivelAcesso = (nivel_acesso) => {
  switch (nivel_acesso) {
    case 0:
      nivel_acesso = "Administrador";
      break;
    case 1:
      nivel_acesso = "Aluno";
      break;
    case 2:
      nivel_acesso = "Usuário";
      break;
    case 3:
      nivel_acesso = "Jogador";
      break;
  }
  return nivel_acesso
}
export const StatusJogo = (jo_status) => {
  switch (jo_status) {
    case 1:
      jo_status = "bg-success";
      break;
    case 2:
      jo_status = "bg-danger";
      break;
  }
  return jo_status
}

export const ErrosValidarConta = (errors, setErrosVisiveis,errosVisiveis) => {
  console.log("ERRO NO VALIDARFUNCAO:", errors[0]);

  errors.forEach((erro) => {
    switch (erro) {
      case "- A senha deve ter pelo menos 8 caracteres":
        setErrosVisiveis((prevState) => ({
          ...prevState,
          erro_senha: true,
        }));
        break;

      case "- As senhas não conferem":
        setErrosVisiveis((prevState) => ({
          ...prevState,
          erro_confirmar_senha: true,
        }));
        break;

      case "- O qrcode é necessario!":
        setErrosVisiveis((prevState) => ({
          ...prevState,
          erro_qr: true,
        }));
        break;

      // Caso de erro desconhecido
      default:
        console.log("Erro desconhecido:", erro);
        console.log("ERRO DESCONEHCIDO LER O COISO DE FALSE E TRUE AQ",errosVisiveis)
        break;
    }
  });
};
