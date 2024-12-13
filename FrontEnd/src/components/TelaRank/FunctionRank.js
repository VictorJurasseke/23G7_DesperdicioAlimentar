// FunctionRank.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SwalErroToken } from '../TelaPerfil/SwalError';

export const urlRank = "http://localhost:3025/api/rank";

export const useImportarDadosRank = (token, navigate) => { 
    const [InfoRank, setInfoRank] = useState([]);
    const [InfoJogo, setInfoJogo] = useState([]);

    const BuscarRank = async () => {
        try {
            const resposta = await axios.get(urlRank, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(resposta.data)
            setInfoRank(resposta.data.InfoRank);
            setInfoJogo(resposta.data.InfoJogo);
        } catch (error) {
            console.error("Erro ao importar dados:", error); // Log do erro para depuração
            SwalErroToken(navigate); // Chama a função de erro caso haja problema
        }
    };

    return {
        InfoRank,
        InfoJogo,
        BuscarRank,
    };
};
