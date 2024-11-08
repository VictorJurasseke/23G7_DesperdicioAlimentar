import { useState } from 'react';
import axios from 'axios';
import { ErrosValidarConta } from '../NivelAcesso';

export const urlUsuario = "http://localhost:3025/api/usuario";

export const useCadastro = (token, navigate) => {



  const ModalErroValidar = (errors) => {
    

    console.log(errors)

    Swal.fire({
      title: 'Erro!',
      html: mensagem,
      icon: 'error',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Tentar novamente',
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
  }



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

  // faz parte do qrcode - scanner
  const [showScanner, setShowScanner] = useState(false);

  const AtivarScan = () => {
    setShowScanner(true);
  };

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

  // O gatilho de mostrar os erros, se estiver false ele não mostra
  const [errosVisiveis, setErrosVisiveis] = useState({
    erro_senha: false,
    erro_confirmar_senha: false,
    erro_qr: false,
    Campo: false,
  })

  const Cadastrar = async () => {

    // Muda tudo pra false para tirar os erros da tela e mostrar denovo caso seja necessario
    try {
      setErrosVisiveis({
        erro_senha: false,
        erro_confirmar_senha: false,
        erro_qr: false,
        Campo: false,
      });

      console.log("A")
      const resposta = await axios.post(`${urlUsuario}/validar`, FormValidar,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

      console.log(resposta.data)

      if (resposta.data.errors) {

        console.log("Há erros presentes", resposta.data.errors)
        console.log("ERROS do visivel:",errosVisiveis)
        ErrosValidarConta(resposta.data.errors, setErrosVisiveis, errosVisiveis)
      }

      if (resposta.data.status === false) {
        ModalErro(resposta.data.message)

      } else if (!resposta.data.errors) {
        ModalSucesso(resposta.data.message)

      } else {
        // Mostrar erro de alguma forma na tela com o sup


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

