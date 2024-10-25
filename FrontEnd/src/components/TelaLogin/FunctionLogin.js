import { useState, useEffect } from "react";
import axios from "axios";

export const UrlUsuario = "http://localhost:3025/api/usuario";



export const useLogin = () => {
    const [FormLogin, setFormlogin] = useState({
        email: "vitorsaleskikao@gmail.com",
        senha: "23492349"
    });

    // Função chamada caso duplicação de dados no banco
    const ModalErro = (erro) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Ocorreu um erro inesperado: ${erro}`,
        
        });
    }

    const LogarUser = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a pagina
        try {
            const resposta = await axios.post(`${UrlUsuario}/login`, FormLogin);
          
            if (resposta.data.token) {
                localStorage.setItem("token", resposta.data.token);
                console.log("Salvo no localStorage",resposta.data.token)
                window.location.href = '/user';

            }else{
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
    //abrir modal perguntado se deseja se desconectar da pagina
    const navigate = useNavigate();
    const [Dados_usuario, setDados_usuario] = useState(null);

    const UrlPerfilDados = "http://localhost:3025/api/perfil";

    // Função para verificar o usuario e mandar as info dele
    const verificarLogin = async () => {
        let token = localStorage.getItem("token");

        if (!token) {
            console.log("Nao possui token") // Redireciona para login se não existir token
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
                console.log(error)
        }
    };

    // Chama a função `retornarPerfil` apenas uma vez, após o componente ser montado
    useEffect(() => {
        verificarLogin();
    }, []); // Array vazio garante que o efeito será executado apenas uma vez

    return { Dados_usuario }; // Retorna o estado
};
