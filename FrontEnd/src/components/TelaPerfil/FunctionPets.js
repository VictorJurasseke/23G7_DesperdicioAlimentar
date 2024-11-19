// usePerfilDados.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwalErroToken } from './SwalError';
const UrlDadosPets = "http://localhost:3025/api/pets";

export const usePetsDados = (token, navigate) => {

    const [TodosPetsTemporada, setTodosPetsTemporada] = useState(null);

    
    
    // Função para procurar todos os pets do usuario no jogo especifico e mandar as info dele
    const ProcurarPets = async () => {
        if (!token) {
            SwalErroToken(navigate) // Redireciona para login se não existir token
            return;
        }
        try {
            let resposta = await axios.get(UrlDadosPets+`/temporada`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(resposta)
            setTodosPetsTemporada(resposta.data.pets);
        } catch (error) {
            SwalErroToken(navigate, error)

          
        }
    };

    // Chama a função `retornarPerfil` apenas uma vez, após o componente ser montado
    // useEffect(() => {
    //     ProcurarPets();
    // }, []); // Array vazio garante que o efeito será executado apenas uma vez

    return { TodosPetsTemporada, ProcurarPets }; // Retorna o estado
};
