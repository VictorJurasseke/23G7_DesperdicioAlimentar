export const NivelAcesso = (nivel_acesso) =>{
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
export const StatusJogo = (jo_status) =>{
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