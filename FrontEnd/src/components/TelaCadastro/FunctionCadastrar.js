import { useState } from 'react';
import axios from 'axios';
import { ErrosValidarConta } from '../NivelAcesso';
import { SwalErroToken } from '../TelaPerfil/SwalError';

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
      title: "Concluído!",
      text: message,
      icon: "success",
    }).then(() => {
      window.location.reload(); // Recarrega a página quando o modal é fechado
    });
  };


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

    let nova_senha = FormValidar.NovaSenha.trim().length
    let qrcode = FormValidar.QRcode.trim().length
    let confirmar_senha = FormValidar.ConfirmarNovaSenha.trim().length

    console.log("FORMULARIO", qrcode, confirmar_senha, nova_senha)
    // como funciona o prevERROS para mudar apenas a propriedade campo
    //   setErrosVisiveis(prevErros => ({
    //     ...prevErros,        // Pega todas as propriedades do estado atual (errosVisiveis)
    //     Campo: true,         // Atualiza apenas a propriedade 'Campo'
    // }));


    if (nova_senha === 0 || qrcode === 0 || confirmar_senha === 0) {
      setErrosVisiveis(prevErros => ({
        ...prevErros,
        Campo: true,
      }))

      return
      // return (console.log("preenhcer os campos boy")); // Interrompe o fluxo de execução para evitar a continuação
    }
    // Muda tudo pra false para tirar os erros da tela e mostrar denovo caso seja necessario
    try {
      setErrosVisiveis({
        erro_senha: false,
        erro_confirmar_senha: false,
        erro_qr: false,
        Campo: false,
      });

      // Função que valida com o formulario do cliente se ele pode ou não virar usuario do site com seus dados
      const resposta = await axios.post(`${urlUsuario}/validar`, FormValidar,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

      console.log(resposta)
      console.log("resposta req:",resposta.data)
      if (resposta.data.errors) {

        console.log("Há erros presentes", resposta.data.errors)
        console.log("ERROS do visivel:", errosVisiveis)
        ErrosValidarConta(resposta.data.errors, setErrosVisiveis, errosVisiveis)
      }

      console.log(resposta)
      if (resposta.data.status === false) {
        ModalErro(resposta.data.message)

      } else if (!resposta.data.errors) {
        ModalSucesso(resposta.data.message)
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      SwalErroToken(navigate, error)
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

