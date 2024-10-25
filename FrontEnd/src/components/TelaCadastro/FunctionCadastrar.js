import { useState } from 'react';
import axios from 'axios';

export const urlUsuario = "http://localhost:3025/api/usuario";

export const useCadastro = () => {


  // Função chamada caso duplicação de dados no banco
  const ModalErro = () =>{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Já possui um usuário com estas informações pessoais!!",
    });
  }

  const ModalSucesso = () =>{
    Swal.fire({
      title: "Concluido!",
      text: "Sua conta foi criada com sucesso!!",
      icon: "success",
      footer: '<a href="/login">Entrar</a>'
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
  });

  const [showScanner, setShowScanner] = useState(false);

  const [Form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmar_senha: "",
    turma: 1,
    periodo: "Matutino",
    unidade: 1,
    qrcode: "",
  });

  const AtualizarForm = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
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
    try {
      setErrosVisiveis({
        erro_nome: false,
        erro_email: false,
        erro_senha: false,
        erro_confirmar_senha: false,
        erro_turma: false,
        erro_unidade: false,
        erro_qr: false,
      });
      const resposta = await axios.post(`${urlUsuario}/registrar`, Form);

      if (resposta.data.status === false) {
        ModalErro()
      } else if (!resposta.data.errors) {
        ModalSucesso()
      } else {
        for (const [chave, mensagem] of Object.entries(resposta.data.errors)) {
          switch (mensagem) {
            case 1:
              MostrarErro("erro_email");
              break;
            case 2:
              MostrarErro("erro_senha");
              break;
            case 3:
              MostrarErro("erro_confirmar_senha");
              break;
            case 4:
              MostrarErro("erro_turma");
              break;
            case 5:
              MostrarErro("erro_unidade");
              break;
            case 6:
              MostrarErro("erro_qr");
              break;
            default:
              break;
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
    Form,
    setShowScanner,
    AtualizarForm,
    AtivarScan,
    Cadastrar,
  };
};

