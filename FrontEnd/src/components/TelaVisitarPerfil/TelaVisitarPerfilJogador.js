// usePerfilDados.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwalErroToken } from '../TelaPerfil/SwalError';

const UrlPerfilDados = "http://localhost:3025/api/perfil";

export const usePerfilJogadorVisitado = (token, navigate, ID_usuarios, ID_jogo) => {

    // Jogador é quem esta sendo visitado
    const [Dados_Visitado, setDados_Visitado] = useState([]);

    
    // Função para verificar o usuario e mandar as info dele
    const BuscarVisitado = async () => {
        if (!token) {
            SwalErroToken(navigate) // Redireciona para login se não existir token
            return;
        }

        try {
            let resposta = await axios.get(UrlPerfilDados+`/visitar/${ID_usuarios}/${ID_jogo}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log("Carregando dados do visitado", resposta.data)
            setDados_Visitado(resposta.data);
        } catch (error) {
            console.log("Deu erro no function perfil")
            SwalErroToken(navigate, error)

          
        }
    };

    // Chama a função `retornarPerfil` apenas uma vez, após o componente ser montado
    // useEffect(() => {
    //     verificarUsuario();
    // }, []); // Array vazio garante que o efeito será executado apenas uma vez

    return { Dados_Visitado, BuscarVisitado }; // Retorna o estado
};
