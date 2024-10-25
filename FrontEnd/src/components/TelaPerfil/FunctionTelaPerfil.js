// usePerfilDados.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwalErroToken } from './SwalError';
const UrlPerfilDados = "http://localhost:3025/api/perfil";

export const usePerfilDados = (token, navigate) => {

    const [Dados_usuario, setDados_usuario] = useState(null);

    
    
    // Função para verificar o usuario e mandar as info dele
    const verificarUsuario = async () => {
        if (!token) {
            SwalErroToken(navigate) // Redireciona para login se não existir token
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
                SwalErroToken(navigate)
          
        }
    };

    // Chama a função `retornarPerfil` apenas uma vez, após o componente ser montado
    useEffect(() => {
        verificarUsuario();
    }, []); // Array vazio garante que o efeito será executado apenas uma vez

    return { Dados_usuario }; // Retorna o estado
};
