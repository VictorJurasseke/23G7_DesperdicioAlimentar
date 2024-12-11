import { useState, useEffect } from "react";
import axios from "axios";

export const UrlUsuario = "http://localhost:3025/api/usuario";
// URL para rota de configuração da tela perfil
const UrlPerfilDados = "http://localhost:3025/api/perfil";



export const useLogin = () => {
    const [FormLogin, setFormlogin] = useState({
        email: "",
        senha: ""
    });

    // Função chamada caso duplicação de dados no banco
    const ModalErro = (erro) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Ocorreu um erro inesperado: ${erro}`,

        });
    }

    // Logar usuario
    const LogarUser = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a pagina
        try {
            const resposta = await axios.post(`${UrlUsuario}/login`, FormLogin);
            if (resposta.data.token) {
                localStorage.setItem("token", resposta.data.token);
                console.log("Salvo no localStorage", resposta.data.token)
                window.location.href = '/user';
            } else {
                ModalErro("Usuário não existe ou credenciais incorretas!")
            }
        } catch (error) {
            ModalErro(error);
        }
    };

    useEffect(() => {
    }, [FormLogin]);

    // Altera o formulário mantendo as informações antigas
    const AtualizarForm = (e) => {
        const { name, value } = e.target;
        setFormlogin(valorAntigo => ({
            ...valorAntigo,
            [name]: value
        }));
    };

    return {
        FormLogin,
        LogarUser,
        AtualizarForm
    }
}

// usePerfilDados.js
import { useNavigate } from 'react-router-dom';


export const useVerificarLogin = () => {



    const navigate = useNavigate();

    // Guarda os possiveis dados do usuario caso ele esteja logado e tente ir para tela login permitindo logar dnv
    const [Dados_usuario, setDados_usuario] = useState(null);



    // Função para verificar o usuario se ele estava logado e mandar as info dele
    const verificarLogin = async () => {
        let token = localStorage.getItem("token");

        if (!token) {
            console.log("Nao possui token")
            return;
        }
        try {
            let resposta = await axios.get(UrlPerfilDados, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDados_usuario(resposta.data[0]);
        } catch (error) {
            console.log("Usuário desconectado")
        }
    };

    // Função para verificar se há dev no banco
    const verificarDEV = async () => {
        try {
            let resposta = await axios.get(UrlPerfilDados + "/dev");

            console.log(resposta.data[0].usuarios)
            if (resposta.data[0].usuarios == 0) {
                console.log("Abrir")
                ModalDev(navigate)
            }


        } catch (error) {
            console.log(error)
        }
    };

    // Chama a função `retornarPerfil` apenas uma vez, após o componente ser montado
    useEffect(() => {
        verificarLogin();
        verificarDEV();
    }, []); // Array vazio garante que o efeito será executado apenas uma vez

    return { Dados_usuario }; // Retorna o estado
};


export const ModalDev = (Erro, setErro, navigate) => {


    Swal.fire({
        title: "Conta de Administrador",
        text: "Coloque suas informações abaixo!",
        html: `
           <form id="form-jogo">
          <div class="mb-3 text-start">
            <label for="dev_email" class="form-label">Email:</label>
            <input type="text" id="dev_email" class="form-control" placeholder="email@gmail.com">
          </div>
          <div class="mb-3 text-start">
            <label for="dev_email" class="form-label">Senha:</label>
            <input type="password" id="dev_senha" class="form-control" placeholder="Senha:">
          </div>
          <div class="mb-3 text-start">
            <label for="dev_confirmar_email" class="form-label">Confirme sua senha:</label>
            <input type="password" id="dev_confirmar_senha" class="form-control" placeholder="Confirmar senha:">
          </div>
        </form>
                    `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Cadastrar",
        confirmButtonColor: '#32CD32',

        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            const dev_email = document.getElementById("dev_email").value;
            const dev_senha = document.getElementById("dev_senha").value;
            const dev_confirmar_senha = document.getElementById("dev_confirmar_senha").value;

            console.log(dev_email)

            CriarADM(dev_email, dev_senha, dev_confirmar_senha, navigate)
        }
    })
}

export const CriarADM = async (dev_email, dev_senha, dev_confirmar_senha, navigate) => {


    try {

        let resposta = await axios.post(UrlPerfilDados + "/dev", { dev_email, dev_senha, dev_confirmar_senha });
        console.log(resposta.data)

        if (resposta.data.errors) {
            ModalErroDev(resposta.data.errors)
        }
    } catch (error) {
        console.log(error)

    }
}

export const gerarMensagemErro = (errors) => {
    const mensagens = [];
    if (errors.dev_email) {
        mensagens.push('- O email não é valido.');
    }
    if (errors.dev_senha) {
        mensagens.push('- A senha precisa ser maior que 8 digitos.');
    }
    if (errors.dev_confirmar_senha) {
        mensagens.push('- A confirmação da senha não coincide.');
    }
    return mensagens.join('<br>'); // Usando <br> para que as mensagens fiquem embaixo uma da outra
}

export const ModalErroDev = (errors) => {

    
    const mensagem = gerarMensagemErro(errors);

    Swal.fire({
        title: 'Erro!',
        html: mensagem,
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Tentar novamente',
    }).then((result) => {
        if (result.isConfirmed) {
            ModalDev();
        }
    });
}

