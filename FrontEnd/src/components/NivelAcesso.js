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

// Recebe o status do jogo para pintar de verde ou vermelho no teladev-jogos
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


// Serve para validar a conta quando o usuário vai criar sua senha
export const ErrosValidarConta = (errors, setErrosVisiveis,errosVisiveis) => {


  errors.forEach((erro) => {
    switch (erro) {
      case "8MIN":
        setErrosVisiveis((prevState) => ({
          ...prevState,
          erro_senha: true,
        }));
        break;

      case "NEWSENHAWRONG":
        setErrosVisiveis((prevState) => ({
          ...prevState,
          erro_confirmar_senha: true,
        }));
        break;

      case "QRCODEREQUIRED":
        setErrosVisiveis((prevState) => ({
          ...prevState,
          erro_qr: true,
        }));
        break;
        
        case "CAMPO":
          setErrosVisiveis((prevState) => ({
            ...prevState,
            Campo: true,
          }));
          break;
      // Caso de erro desconhecido
      default:
        break;
    }
  });
};
