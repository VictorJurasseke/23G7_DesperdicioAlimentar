import { useState } from 'react';
import axios from 'axios';
import { ErrosValidarConta } from '../NivelAcesso';
import { SwalErroToken } from '../TelaPerfil/SwalError';

export const urlJogos = "http://localhost:3025/api/jogos";

export const usePeso = (token, navigate) => {

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


  // Variavel que guarda os campos do formulario
  const [FormPeso, setFormPeso] = useState({
    Peso: "",
    QRcode: "",
  });

  const AtualizarFormPeso = (e) => {
    const { name, value } = e.target;
    setFormPeso(prevState => ({
      ...prevState,
      [name]: value,
    }))
    console.log(FormPeso);
  };

  // O gatilho de mostrar os erros, se estiver false ele não mostra
  const [errosVisiveis, setErrosVisiveis] = useState({
 
  })


  const ProgressoPeso = async () => {

    let TrimPeso = FormPeso.Peso.trim().length
    let TrimQRcode = FormPeso.QRcode.trim().length

    console.log("FORMULARIO lenght:", TrimQRcode, TrimPeso)
    // como funciona o prevERROS para mudar apenas a propriedade campo
    //   setErrosVisiveis(prevErros => ({
    //     ...prevErros,        // Pega todas as propriedades do estado atual (errosVisiveis)
    //     Campo: true,         // Atualiza apenas a propriedade 'Campo'
    // }));


    if (TrimPeso === 0 || TrimQRcode === 0) {
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
        Peso_erro:false,
        QRcode_erro:false
      });


      // Função passa formulario na rota /peso para rodar o progresso do usuário
      const resposta = await axios.post(`${urlJogos}/peso`, FormPeso,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

      console.log(resposta)
      console.log("resposta req:", resposta.data)
      if (resposta.data.errors) {

        console.log("Há erros presentes", resposta.data.errors)
        console.log("ERROS do visivel:", errosVisiveis)
        ErrosPesoConta(resposta.data.errors, setErrosVisiveis, errosVisiveis)
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
    FormPeso,
    setShowScanner,
    AtualizarFormPeso,
    AtivarScan,
    ProgressoPeso,
  };
};

