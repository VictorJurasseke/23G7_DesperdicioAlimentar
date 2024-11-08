import { useState } from 'react';
import axios from 'axios';

export const urlUsuario = "http://localhost:3025/api/usuario";

export const useCadastro = (token, navigate) => {


  // Função chamada caso duplicação de dados no banco
  const ModalErro = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }

  const ModalSucesso = (message) => {
    Swal.fire({
      title: "Concluido!",
      text: message,
      icon: "success",
      footer: '<a href="/user">Recarregar Página</a>'
    });
  }

  const [errosVisiveis, setErrosVisiveis] = useState({
    erro_nome: false,
    erro_email: false,
    erro_senha: false,
    erro_confirmar_senha: false,
    erro_turma: false,
    erro_unidade: false,
    erro_qr: false,
    erro_campo: false,
  });

  const [showScanner, setShowScanner] = useState(false);

  const [FormValidar, setFormValidar] = useState({
    NovaSenha: "",
    ConfirmarNovaSenha: "",
    QRcode: ""
  });

  const AtualizarFormValidar = (e) => {
    const { name, value } = e.target;
    setFormValidar(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const MostrarErro = (parameter) => {
    setErrosVisiveis(prevState => ({
      ...prevState,
      [parameter]: true,
    }));
  };

  const AtivarScan = () => {
    setShowScanner(true);
  };

  const Cadastrar = async () => {
    console.log("FUNção chamada")

    try {
      setErrosVisiveis({
        erro_senha: false,
        erro_confirmar_senha: false,
        erro_qr: false,
        Campo: false,
      });

      const resposta = await axios.post(`${urlUsuario}/validar`, FormValidar,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

      console.log(resposta)
      if (resposta.data.status === false) {
        ModalErro(resposta.data.message)
      } else if (!resposta.data.errors) {
        ModalSucesso(resposta.data.message)
      } else {
        for (const [chave, mensagem] of Object.entries(resposta.data.errors)) {
          switch (mensagem) {
            case 1:
              MostrarErro("erro_senha");
              console.log("Senha precisa ser maior que 8 caractéres")
              break;
            case 2:
              MostrarErro("erro_confirmar_senha");
              console.log("As senhas não conferem")
              break;
            case 3:
              MostrarErro("erro_campo");
              console.log("Preencha todos os campos:")
              break;
            default:
          }
        }
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    }
  };

  return {
    errosVisiveis,
    showScanner,
    FormValidar,
    setShowScanner,
    AtualizarFormValidar,
    AtivarScan,
    Cadastrar,
  };
};

