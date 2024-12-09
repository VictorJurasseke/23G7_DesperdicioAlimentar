// FunctionRank.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SwalErroToken } from '../TelaPerfil/SwalError';

export const urlRank = "http://localhost:3025/api/rank";

export const useImportarDadosRank = (token, navigate) => { 
    const [TableRank, setTableRank] = useState([]);

    const BuscarRank = async () => {
        try {
            const resposta = await axios.get(urlRank, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(resposta.data)
            setTableRank(resposta.data);
        } catch (error) {
            console.error("Erro ao importar dados:", error); // Log do erro para depuração
            SwalErroToken(navigate); // Chama a função de erro caso haja problema
        }
    };

    return {
        TableRank,
        BuscarRank,
    };
};
