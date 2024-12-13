import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const urlRelatorio = "http://localhost:3025/api/relatorio";
import { SwalErroToken } from '../../TelaPerfil/SwalError';


// Variavel necessaria para o SweetAlert2



// FUNÇÃO QUE PEGA E SOMA O PESO ACUMULATIVO TOTAL
export const useImportarTotalAnual = (token, navigate) => {
    const [DesperdicioAnual, setDesperdicioAnual] = useState([])
    const [TurmasAnual, setTurmasAnual] = useState([])
    async function BuscarTotalAnual() {
        console.log("buscando total..")
        try {
            let resposta = await axios.get(urlRelatorio, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(resposta.data)
            setDesperdicioAnual(resposta.data.desperdicio)
            setTurmasAnual(resposta.data.turmas)
        } catch (error) {
            SwalErroToken(navigate, error)
        }
    }
    return {
        TurmasAnual,
        DesperdicioAnual,
        BuscarTotalAnual
    }
}


export const useImportarTemporadas = (token, navigate) => {
    
    const [Temporadas, setTemporadas] = useState([])

    async function BuscarTotalTemporadas() {
        console.log("buscando total das temporadas..")
        try {
            let resposta = await axios.get(`${urlRelatorio}/Temporadas`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(resposta.data.resultados)
            setTemporadas(resposta.data.resultados)
         
        } catch (error) {
            SwalErroToken(navigate, error)
        }
    }
    return {
        Temporadas,
        BuscarTotalTemporadas
    }
}

