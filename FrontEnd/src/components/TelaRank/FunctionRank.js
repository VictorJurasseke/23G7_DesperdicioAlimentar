// FunctionRank.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SwalErroToken } from '../TelaPerfil/SwalError';

export const urlRank = "http://localhost:3025/api/rank";

export const useImportarDadosRank = (token, navigate) => { 
    const [TableRank, setTableRank] = useState([]);

    const atualizar = async () => {
        try {
            const resposta = await axios.get(urlRank, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTableRank(resposta.data);
        } catch (error) {
            console.error("Erro ao importar dados:", error); // Log do erro para depuração
            SwalErroToken(navigate); // Chama a função de erro caso haja problema
        }
    };

    useEffect(() => {
        if (!token) {
            SwalErroToken(navigate); // Verifica se o token é válido
        } else {
            atualizar(); // Chama atualizar apenas se o token for válido
        }
    }, []); // Adiciona token e navigate como dependências

    return {
        TableRank,
        atualizar,
    };
};
