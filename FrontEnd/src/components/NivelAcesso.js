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
export const ErrosValidarConta = (errors, setErrosVisiveis, errosVisiveis) => {


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
}
export const MudarFundoraridade = (tipo) => {
  let cor;
  switch (tipo) {
    case "Comum":
      cor = "#4A90D6";  // Azul claro e suave
      break;
    case "Raro":
      cor = "#FFA500";  // Laranja vibrante para o tipo Raro
      break;
    case "Épico":
      cor = "#8E44AD";  // Roxo mais intenso e sofisticado, para um contraste elegante com o azul
      break;
    case "Lendário":
      cor = "#FFCC00";  // Amarelo dourado mais vibrante, mais chamativo e destacado
      break;
    default:
      cor = "#000000";  // Cor padrão (caso o tipo não seja reconhecido)
  }
  return cor;
};




